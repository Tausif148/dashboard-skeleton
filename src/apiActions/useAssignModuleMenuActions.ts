import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import { IAssignModuleMenu } from 'src/interface/assignModuleMenu.types';
import { ASSIGN_MODULE_MENU_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useAssignModuleMenuActions = () => {
  const action = useApiAction();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const queryCacheUtils = new QueryCacheUtils(queryClient);

  const tryAdd = async (body: IAssignModuleMenu) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: ASSIGN_MODULE_MENU_API.CREATE_ASSIGN_MODULE_MENU,
          method: 'post',
          data: body,
        },
        {
          onSuccess: async (response: any) => {
            toast.success(response?.message || 'Module added successfully');
            await queryCacheUtils.refetchQueries([QueryKeys.assignModuleMenu]);
            resolve(response);
          },
          onError: (error: any) => {
            toast.error(error?.message || 'Creation failed');

            reject(error);
          },
        },
      );
    });
  };

  const tryUpdate = async (id: string, body: IAssignModuleMenu) => {
    try {
      const response = await action.mutateAsync({
        url: ASSIGN_MODULE_MENU_API.UPDATE_ASSIGN_MODULE_MENU(id),
        method: 'put',
        data: body,
      });

      toast.success(response?.message || 'Module updated successfully');

      await queryCacheUtils.refetchQueries([QueryKeys.assignModuleMenu]);
      return response;
    } catch (error: any) {
      snackbar?.show({
        title: error?.error?.message || error?.message || 'Failed to update',
        type: 'error',
      });
      throw error;
    }
  };

  const tryDelete = async (id: string) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: ASSIGN_MODULE_MENU_API.DELETE_ASSIGN_MODULE_MENU(id),
          method: 'delete',
        },
        {
          onSuccess: async (response: any) => {
            snackbar?.show({
              title: response?.message || 'Deleted successfully',
              type: 'error',
            });
            await queryCacheUtils.refetchQueries([QueryKeys.assignModuleMenu]);
            resolve(response);
          },
          onError: (error: any) => {
            snackbar?.show({
              title: error?.error?.message || 'Deletion failed',
              type: 'error',
            });
            console.error('Delete failed:', error);
            reject(error);
          },
        },
      );
    });
  };

  return { tryAdd, tryDelete, tryUpdate };
};