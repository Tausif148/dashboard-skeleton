import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import { IPlan } from 'src/interface/plan.types';
import { PLAN_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const usePlanActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: IPlan) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync(
                {
                    url: PLAN_API.CREATE_PLAN,
                    method: 'post',
                    data: body,
                },
                {
                    onSuccess: async (response: any) => {
                        await queryCacheUtils.refetchQueries([QueryKeys.plans]);
                        toast.success(response?.message || 'Added successfully');
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

    const tryUpdate = async (id: string, body: IPlan) => {
        try {
            const response = await action.mutateAsync({
                url: PLAN_API.UPDATE_PLAN(id),
                method: 'put',
                data: body,
            });
            await queryCacheUtils.refetchQueries([QueryKeys.plans]);
            toast.success(response?.message || 'Updated successfully');
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
        try {
            const url = PLAN_API.DELETE_PLAN(id);
            console.log('DELETE URL:', url);

            const response = await action.mutateAsync({
                url,
                method: 'delete',
            });

            await queryCacheUtils.refetchQueries([QueryKeys.plans]);
            toast.success(response?.message || 'Deleted successfully'); // also fix this

            return response;
        } catch (error: any) {
            toast.error(error?.message || 'Failed to delete');
            throw error;
        }
    };;

    return { tryAdd, tryDelete, tryUpdate };
};
