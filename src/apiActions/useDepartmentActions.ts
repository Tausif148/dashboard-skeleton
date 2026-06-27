import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IDepartment } from 'src/interface/department.types';
import { DEPARTMENT_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useDepartmentActions = () => {
  const action = useApiAction();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const queryCacheUtils = new QueryCacheUtils(queryClient);
  const { company_id } = useDecoded();

  const withCompany = (body: IDepartment): IDepartment => ({
    ...body,
    company_id,
  });

  const tryAdd = async (body: IDepartment) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: DEPARTMENT_API.CREATE_DEPARTMENT,
          method: 'post',
          data: withCompany(body),
        },
        {
          onSuccess: async (response: any) => {
            toast.success(response?.message || 'Departments added successfully');
            await queryCacheUtils.refetchQueries([QueryKeys.departments]);
            resolve(response);
          },
          onError: (error: any) => {
            snackbar?.show({
              title: error?.error?.message || error?.message || 'failed',
              type: 'error',
            });
            reject(error);
          },
        },
      );
    });
  };

  const tryUpdate = async (id: string, body: IDepartment) => {
    try {
      const response = await action.mutateAsync({
        url: DEPARTMENT_API.UPDATE_DEPARTMENT(id),
        method: 'put',
        data: withCompany(body),
      });

      toast.success(response?.message || 'Departments updated successfully');

      await queryCacheUtils.refetchQueries([QueryKeys.departments]);
      return response;
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update');
      throw error;
    }
  };

  const tryDelete = async (id: string) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: DEPARTMENT_API.DELETE_DEPARTMENT(id),
          method: 'delete',
          config: {
            params: {
              company_id,
            },
          },
        },
        {
          onSuccess: async (response: any) => {
            toast.error(response?.message || 'Deleted successfully!');

            await queryCacheUtils.refetchQueries([QueryKeys.departments]);
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
