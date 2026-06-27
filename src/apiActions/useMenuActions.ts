import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { QueryKeys } from 'src/constants/queryKeys';
import { IMenu } from 'src/interface/menu.types';
import { MENU_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useMenuActions = () => {
  const action = useApiAction();
  const queryClient = useQueryClient();
  const queryCacheUtils = new QueryCacheUtils(queryClient);

  const tryAdd = async (body: IMenu) => {
    try {
      const response = await action.mutateAsync({
        url: MENU_API.CREATE_MENU,
        method: 'post',
        data: body,
      });

      await queryCacheUtils.refetchQueries([QueryKeys.menus]);
      toast.success(response?.message || 'Menu added successfully');
      return response;
    } catch (error: any) {
      toast.error(error?.error?.message || error?.message || 'Failed to add menu');
      throw error;
    }
  };

  const tryUpdate = async (id: string, body: IMenu) => {
    try {
      const response = await action.mutateAsync({
        url: MENU_API.UPDATE_MENU(id),
        method: 'put',
        data: body,
      });

      await queryCacheUtils.refetchQueries([QueryKeys.menus]);
      toast.success(response?.message || 'Menu updated successfully');
      return response;
    } catch (error: any) {
      toast.error(error?.error?.message || error?.message || 'Failed to update menu');
      throw error;
    }
  };

  const tryDelete = async (id: string) => {
    try {
      const response = await action.mutateAsync({
        url: MENU_API.DELETE_MENU(id),
        method: 'delete',
      });

      await queryCacheUtils.refetchQueries([QueryKeys.menus]);
      toast.error(response?.message || 'Menu deleted successfully');
      return response;
    } catch (error: any) {
      toast.error(error?.error?.message || error?.message || 'Failed to delete menu');
      throw error;
    }
  };

  return { tryAdd, tryDelete, tryUpdate };
};
