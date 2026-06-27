import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import client from './client';

interface ApiActionParams {
  url: string;
  method?: 'post' | 'put' | 'patch' | 'delete' | 'get';
  data?: any;
  config?: AxiosRequestConfig;
  headers?: Record<string, string>;
}

export function useApiAction<TResponse = any>(
  options?: UseMutationOptions<TResponse, unknown, ApiActionParams>,
) {
  return useMutation<any, unknown, ApiActionParams>({
    mutationFn: async ({ url, method = 'post', data, config, headers }) => {
      const isFormData = data instanceof FormData;

      const response = await client.request<TResponse>({
        url,
        method,
        data,
        headers: {
          ...(isFormData
            ? {} // ✅ Agar FormData hai to Axios khud "multipart/form-data" set karega
            : { 'Content-Type': 'application/json' }), // ✅ Default JSON
          ...headers, // ✅ agar user custom headers bhejna chahe to override karega
        },
        ...config,
      });

      return response;
    },
    ...options,
  });
}
