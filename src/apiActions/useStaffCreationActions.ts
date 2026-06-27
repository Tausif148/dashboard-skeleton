import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import { IManPower } from 'src/interface/manPower.types';
import { MANPOWER_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useStaffCreationActions = () => {
  const action = useApiAction();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const queryCacheUtils = new QueryCacheUtils(queryClient);

  const tryAdd = async (body: IManPower) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: MANPOWER_API.CREATE_MANPOWER,
          method: 'post',
          data: body,
        },
        {
          onSuccess: async (response: any) => {
            toast.success(response?.message || 'Staff created successfully!');
            await queryCacheUtils.refetchQueries([QueryKeys.manpower]);
            resolve(response);
          },
          onError: (error: any) => {
            toast.error(error?.message || 'Staff creation failed !');

            reject(error);
          },
        },
      );
    });
  };

  const tryUpdate = async (id: string, body: IManPower) => {
    try {
      const response = await action.mutateAsync({
        url: MANPOWER_API.UPDATE_MANPOWER(id),
        method: 'put',
        data: body,
      });

      toast.success(response?.message || 'Staff updated successfully!');

      await queryCacheUtils.refetchQueries([QueryKeys.manpower]);
      return response;
    } catch (error: any) {
      toast.error(error?.message || 'Staff update failed!');
      throw error;
    }
  };

  const tryDelete = async (id: string) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: MANPOWER_API.DELETE_MANPOWER(id),
          method: 'delete',
        },
        {
          onSuccess: async (response: any) => {
            toast.error(response?.message || 'Deleted successfully!');

            await queryCacheUtils.refetchQueries([QueryKeys.manpower]);
            resolve(response);
          },
          onError: (error: any) => {
            toast.error(error?.message || 'Deleted successfully');

            console.error('Delete failed:', error);
            reject(error);
          },
        },
      );
    });
  };

  return { tryAdd, tryDelete, tryUpdate };
};
