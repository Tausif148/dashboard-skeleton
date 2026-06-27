import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import { IModule } from 'src/interface/module.types';
import { MODULE_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useModuleActions = () => {
  const action = useApiAction();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const queryCacheUtils = new QueryCacheUtils(queryClient);

  const tryAdd = async (body: IModule) => {
    try {
      const response = await action.mutateAsync({
        url: MODULE_API.CREATE_MODULE,
        method: 'post',
        data: body,
      });
      await queryCacheUtils.refetchQueries([QueryKeys.modules]);
      toast.success(response?.message || 'Module added successfully');
      return response;
    } catch (error: any) {
      toast.error(error?.error?.message || error?.message || 'Failed to add module');
      throw error;
    }
  };

  const tryUpdate = async (id: string, body: IModule) => {
    try {
      const response = await action.mutateAsync({
        url: MODULE_API.UPDATE_MODULE(id),
        method: 'put',
        data: body,
      });

      await queryCacheUtils.refetchQueries([QueryKeys.modules]);
      toast.success(response?.message || 'Module updated successfully');
      return response;
    } catch (error: any) {
      toast.error(error?.error?.message || error?.message || 'Failed to update module');
      throw error;
    }
  };

  const tryDelete = async (id: string) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: MODULE_API.DELETE_MODULE(id),
          method: 'delete',
        },
        {
          onSuccess: async (response: any) => {
            await queryCacheUtils.refetchQueries([QueryKeys.modules]);
            resolve(response);
            toast.error(response?.message || 'Deleted successfully!');
          },
          onError: (error: any) => {
            toast.error(error?.message || 'Deletion failed!');
            console.error('Delete failed:', error);
            reject(error);
          },
        },
      );
    });
  };

  return { tryAdd, tryDelete, tryUpdate };
};
