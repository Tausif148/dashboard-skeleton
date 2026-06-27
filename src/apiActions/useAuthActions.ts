import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { useAuthActionsRedux } from 'src/redux/auth/authSlice';
import { AUTHENTICATION_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';

export const useAuthActions = () => {
  const action = useApiAction();
  const snackbar = useSnackbar();
  const { setUserCredential } = useAuthActionsRedux();
  // const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      action.mutate(
        {
          url: AUTHENTICATION_API.LOGIN,
          method: 'post',
          data: {
            username: username,
            password: password,
            fcmToken: 'fcm token',
            deviceId: 'device-uuid-1234',
          },
        },
        {
          onSuccess: (response: any) => {
            // snackbar?.show({
            //     title: response.message || "Logged In Successfully",
            //     type: "success",
            // });
            toast.success(response?.message || 'Logged In Successfully');
            console.log(response)
            localStorage.setItem('refreshToken', response?.data?.refresh_token);
            // store full user payload so UI can use role/assigned modules
            try {
              localStorage.setItem('user', JSON.stringify(response?.data));
            } catch (e) {
              // ignore storage errors
            }
            setUserCredential({
              token: response?.data?.access_token,
              isLoggedIn: true,
            });
            // console.log("login response", response);
            resolve(response);
            // navigate('/dashboard');
            // Handle successful login response
            return response;
          },
          onError: (error: any) => {
            // snackbar?.show({
            //     title: error?.error?.message || "Login failed",
            //     type: "error",
            // });
            reject(error);
          },
        },
      );
    });
  };

  const tryLogout = async () => {
    // Remove known auth keys only (don't clear everything)
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');

    setUserCredential({ token: '', isLoggedIn: false });

    // return new Promise((resolve, reject) => {
    //     action.mutate(
    //         {
    //             url: AUTHENTICATION_API.LOG_OUT,
    //             method: "post",
    //             data: {
    //                 deviceId: "device-uuid-1234",
    //             },
    //         },
    //         {
    //             onSuccess: (response: any) => {
    //                 snackbar?.show({ title: response?.message || "Logged out successfully", type: "success" });

    //                 // Remove known auth keys only (don't clear everything)
    //                 localStorage.removeItem("refreshToken");
    //                 localStorage.removeItem("accessToken");
    //                 localStorage.removeItem("token");

    //
    //                 setUserCredential({ token: "", isLoggedIn: false });

    //                 console.log("logout response", response);
    //                 resolve(true);
    //             },
    //             onError: (error: any) => {
    //                 const status = error?.status ?? error?.statusCode ?? error?.response?.status;
    //                 // Treat 401 as already-logged-out: clear client state and resolve
    //                 if (status === 401) {
    //                     localStorage.removeItem("refreshToken");
    //                     localStorage.removeItem("accessToken");
    //                     localStorage.removeItem("token");
    //                     setUserCredential({ token: "", isLoggedIn: false });
    //                     snackbar?.show({ title: "Logged out", type: "success" });
    //                     resolve(true);
    //                     return;
    //                 }

    //                 snackbar?.show({ title: error?.error?.message || "Logout failed", type: "error" });
    //                 reject(error);
    //             },
    //         }
    //     );
    // });
  };

  // const tryLogout = async (): Promise<boolean> => {
  //     return new Promise((resolve, reject) => {
  //         action.mutate(
  //             {
  //                 url: AUTHENTICATION_API.LOG_OUT,
  //                 method: "post",
  //                 data: {
  //                     deviceId: "device-uuid-1234",
  //                 },
  //             },
  //             {
  //                 onSuccess: (response: any) => {
  //                     snackbar?.show({ title: response?.message || "Logged out successfully", type: "success" });

  //                     // Remove known auth keys only (don't clear everything)
  //                     localStorage.removeItem("refreshToken");
  //                     localStorage.removeItem("accessToken");
  //                     localStorage.removeItem("token");

  //
  //                     setUserCredential({ token: "", isLoggedIn: false });

  //                     console.log("logout response", response);
  //                     resolve(true);
  //                 },
  //                 onError: (error: any) => {
  //                     const status = error?.status ?? error?.statusCode ?? error?.response?.status;
  //                     // Treat 401 as already-logged-out: clear client state and resolve
  //                     if (status === 401) {
  //                         localStorage.removeItem("refreshToken");
  //                         localStorage.removeItem("accessToken");
  //                         localStorage.removeItem("token");
  //                         setUserCredential({ token: "", isLoggedIn: false });
  //                         snackbar?.show({ title: "Logged out", type: "success" });
  //                         resolve(true);
  //                         return;
  //                     }

  //                     snackbar?.show({ title: error?.error?.message || "Logout failed", type: "error" });
  //                     reject(error);
  //                 },
  //             }
  //         );
  //     });
  // };

  return { login, tryLogout };
};
