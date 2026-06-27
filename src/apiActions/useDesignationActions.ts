import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IDesignation } from 'src/interface/designation.types';
import { DESIGNATION_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useDesignationActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);
    const { company_id } = useDecoded();

    const withCompany = (body: IDesignation): IDesignation => ({
        ...body,
        company_id,
    });

    const tryAdd = async (body: IDesignation) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync(
                {
                    url: DESIGNATION_API.CREATE_DESIGNATION,
                    method: 'post',
                    data: withCompany(body),
                },
                {
                    onSuccess: async (response: any) => {
                        toast.success(response?.message || 'Designations added successfully');
                        await queryCacheUtils.refetchQueries([QueryKeys.designations]);
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

    const tryUpdate = async (id: string, body: IDesignation) => {
        try {
            const response = await action.mutateAsync({
                url: DESIGNATION_API.UPDATE_DESIGNATION(id),
                method: 'put',
                data: withCompany(body),
            });

            toast.success(response?.message || 'Designations updated successfully');

            await queryCacheUtils.refetchQueries([QueryKeys.designations]);
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
                    url: DESIGNATION_API.DELETE_DESIGNATION(id),
                    method: 'delete',
                    config: {
                        params: {
                            company_id,
                        },
                    },
                },
                {
                    onSuccess: async (response: any) => {
                        toast.error(response?.message || 'Deleted successfully');

                        await queryCacheUtils.refetchQueries([QueryKeys.designations]);
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
