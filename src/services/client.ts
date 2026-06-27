import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { logout } from 'src/redux/auth/authSlice';
import { store } from 'src/redux/store';
// import {
//   clubUsersEndpoints,
//   guideUsersEndpoints,
//   loungesEndpoints,
//   oryxEmberStars,
// } from '../services/endpoints';

// ----------------------
// Axios Base Client
// ----------------------
const client: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_ROUTES = ['login', 'register', 'check-username'];
const FILE_ROUTES = [
  'sample',
  'users',
  'import',
  'upload',
  'upload_image',
];

// ----------------------
// Request Interceptor
// ----------------------
client.interceptors.request.use(
  (request) => {
    const authRoutes = AUTH_ROUTES.some((i) => request.url?.includes(i));
    const uploadRoutes =
      (request.method?.toLowerCase() === 'post' ||
        request.method?.toLowerCase() === 'put' ||
        request.method?.toLowerCase() === 'patch') &&
      FILE_ROUTES.some((i) => request.url?.includes(i));

    const { auth } = store.getState();
    const { token } = auth;

    if (!authRoutes) {
      request.headers.Authorization = `Bearer ${token}`;
      request.headers.timestamp = new Date().getTime().toString();
    }

    // ✅ Fix: only set multipart if it's really FormData
    if (uploadRoutes && request.data instanceof FormData) {
      request.headers['Content-Type'] = 'multipart/form-data';
    } else {
      request.headers['Content-Type'] = 'application/json';
    }

    return request;
  },
  (error) => Promise.reject(error),
);

// ----------------------
// Response Interceptor
// ----------------------
client.interceptors.response.use(
  (response: AxiosResponse) => {
    if ((response.data as any)?.error) {
      const raw = response.data as any;
      const err = raw.error;

      // Normalize error into consistent shape: { message: string, details?: string[] }
      const normalize = (e: any) => {
        if (!e) return { message: 'Unknown error' };
        if (typeof e === 'string') return { message: e };
        if (Array.isArray(e)) return { message: e.join('; '), details: e };
        if (typeof e === 'object') {
          if (Array.isArray(e.details) && e.details.length)
            return { message: e.details.join('; '), details: e.details };
          if (e.message) {
            if (Array.isArray(e.message))
              return { message: e.message.join('; '), details: e.message };
            return { message: String(e.message) };
          }
          return { message: JSON.stringify(e) };
        }
        return { message: String(e) };
      };

      const normalizedError = normalize(err);
      return Promise.reject({ ...raw, error: normalizedError });
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 404) {
      console.warn('API 404 Not Found:', error.request.responseURL, error.response?.data);
    }

    // const authRoutes = AUTH_ROUTES.some((i) => error.request?.responseURL?.includes(i));
    const takeInviteURL = error.request?.responseURL?.includes('/invite/accept');

    if (takeInviteURL) {
      return Promise.reject(error.response?.data);
    }

    // Handle token expiry or invalid token: clear auth and redirect to login
    const isAuthRoute = AUTH_ROUTES.some((route) => error.request?.responseURL?.includes(route));
    if (
      !isAuthRoute &&
      (error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.response?.data?.detail === 'Invalid or expired token' ||
        (error.response?.data?.error &&
          String(error.response.data.error).includes('Invalid or expired token')))
    ) {
      // Remove stored tokens
      try {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
      } catch (e) {
        // ignore
      }

      try {
        store.dispatch(logout());
      } catch (e) {
        // ignore
      }

      // Redirect to login page
      try {
        window.location.href = '/login';
      } catch (e) {
        // ignore
      }

      return Promise.reject(error.response?.data ?? { message: 'Unauthorized' });
    }

    if (error.response?.status === 511) {
      localStorage.clear();
    }

    // Normalize error response shape before rejecting so UI can consistently read `error.message` or `error.details`
    const respData = error.response?.data;
    if (respData && respData.error) {
      const err = respData.error;
      const normalize = (e: any) => {
        if (!e) return { message: 'Unknown error' };
        if (typeof e === 'string') return { message: e };
        if (Array.isArray(e)) return { message: e.join('; '), details: e };
        if (typeof e === 'object') {
          if (Array.isArray(e.details) && e.details.length)
            return { message: e.details.join('; '), details: e.details };
          if (e.message) {
            if (Array.isArray(e.message))
              return { message: e.message.join('; '), details: e.message };
            return { message: String(e.message) };
          }
          return { message: JSON.stringify(e) };
        }
        return { message: String(e) };
      };
      return Promise.reject({ ...respData, error: normalize(err) });
    }

    return Promise.reject(error.response?.data);
  },
);

// ----------------------
// Throttling Logic
// ----------------------
const SHORT_LIMIT = { count: 3, windowMs: 1000 };
const MEDIUM_LIMIT = { count: 20, windowMs: 10000 };
const LONG_LIMIT = { count: 100, windowMs: 60000 };

const sentTimestamps: number[] = [];
interface QueueItem {
  fn: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}
const requestQueue: QueueItem[] = [];
let isProcessingQueue = false;

function canSendNow(): boolean {
  const now = Date.now();
  while (sentTimestamps.length && now - sentTimestamps[0] > LONG_LIMIT.windowMs) {
    sentTimestamps.shift();
  }

  const countInWindow = (windowMs: number) =>
    sentTimestamps.filter((t) => now - t < windowMs).length;

  return (
    countInWindow(SHORT_LIMIT.windowMs) < SHORT_LIMIT.count &&
    countInWindow(MEDIUM_LIMIT.windowMs) < MEDIUM_LIMIT.count &&
    countInWindow(LONG_LIMIT.windowMs) < LONG_LIMIT.count
  );
}

function processQueue() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;

  const trySend = () => {
    while (requestQueue.length && canSendNow()) {
      const item = requestQueue.shift();
      if (!item) continue;
      const { fn, resolve, reject } = item;
      sentTimestamps.push(Date.now());
      fn().then(resolve).catch(reject);
    }

    if (requestQueue.length) {
      const now = Date.now();
      const nextTimes = [
        sentTimestamps.length >= SHORT_LIMIT.count
          ? sentTimestamps[sentTimestamps.length - SHORT_LIMIT.count] + SHORT_LIMIT.windowMs
          : now,
        sentTimestamps.length >= MEDIUM_LIMIT.count
          ? sentTimestamps[sentTimestamps.length - MEDIUM_LIMIT.count] + MEDIUM_LIMIT.windowMs
          : now,
        sentTimestamps.length >= LONG_LIMIT.count
          ? sentTimestamps[sentTimestamps.length - LONG_LIMIT.count] + LONG_LIMIT.windowMs
          : now,
      ];
      const nextTime = Math.max(...nextTimes);
      const delay = Math.max(0, nextTime - now);
      setTimeout(trySend, delay);
    } else {
      isProcessingQueue = false;
    }
  };

  trySend();
}

function enqueueRequest<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fn, resolve, reject });
    processQueue();
  });
}

// ----------------------
// Create Throttled Client (Typed)
// ----------------------
const throttledClient: AxiosInstance = {
  ...client,
  get: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.get<T, R>(url, config)),

  delete: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.delete<T, R>(url, config)),

  head: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.head<T, R>(url, config)),

  options: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.options<T, R>(url, config)),

  post: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.post<T, R>(url, data, config)),

  put: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.put<T, R>(url, data, config)),

  patch: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) =>
    enqueueRequest(() => client.patch<T, R>(url, data, config)),
} as AxiosInstance;

export default throttledClient;
