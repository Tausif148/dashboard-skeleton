import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IQualification } from 'src/interface/qualification.types';
import { QUALIFICATION_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useQualificationActions = () => {
  const action = useApiAction();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const queryCacheUtils = new QueryCacheUtils(queryClient);
  const { company_id } = useDecoded();

  const withCompany = (body: IQualification): IQualification => ({
    ...body,
    company_id,
  });

  const tryAdd = async (body: IQualification) => {
    return new Promise((resolve, reject) => {
      action.mutateAsync(
        {
          url: QUALIFICATION_API.CREATE_QUALIFICATION,
          method: 'post',
          data: withCompany(body),
        },
        {
          onSuccess: async (response: any) => {
            toast.success(response?.message || 'Qualification added successfully');
            await queryCacheUtils.refetchQueries([QueryKeys.qualifications]);
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

  const tryUpdate = async (id: string, body: IQualification) => {
    try {
      const response = await action.mutateAsync({
        url: QUALIFICATION_API.UPDATE_QUALIFICATION(id),
        method: 'put',
        data: withCompany(body),
      });

      toast.success(response?.message || 'Qualification updated successfully');

      await queryCacheUtils.refetchQueries([QueryKeys.qualifications]);
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
          url: QUALIFICATION_API.DELETE_QUALIFICATION(id),
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

            await queryCacheUtils.refetchQueries([QueryKeys.qualifications]);
            resolve(response);
          },
          onError: (error: any) => {
            toast.error(error?.message || 'Delete failed');
            console.error('Delete failed:', error);
            reject(error);
          },
        },
      );
    });
  };

  return { tryAdd, tryDelete, tryUpdate };
};
