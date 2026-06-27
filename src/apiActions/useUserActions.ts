//useUserActions 

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSnackbar } from 'src/components/Snackbar';
import { QueryKeys } from 'src/constants/queryKeys';
import { IUser } from 'src/interface/user.types';
import { USER_API } from 'src/services/endpoint';
import { useApiAction } from 'src/services/useApiAction';
import { QueryCacheUtils } from 'src/utils/queryCacheUtils';

export const useUserActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: IUser) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync(
                {
                    url: USER_API.CREATE_USER,
                    method: 'post',
                    data: body,
                },
                {
                    onSuccess: async (response: any) => {
                        await queryCacheUtils.refetchQueries([QueryKeys.users]);
                        toast.success(response?.message || 'User added successfully!');
                        resolve(response);
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || 'Failed to add user!');
                        reject(error);
                    },
                },
            );
        });
    };

    const tryUpdate = async (id: string, body: IUser) => {
        try {
            const response = await action.mutateAsync({
                url: USER_API.UPDATE_USER(id),
                method: 'put',
                data: body,
            });

            await queryCacheUtils.refetchQueries([QueryKeys.users]);
            toast.success(response?.message || 'User updated successfully!');
            return response;
        } catch (error: any) {
            toast.success(error?.message || 'Failed update user!');
            throw error;
        }
    };

    const tryDelete = async (id: string) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync(
                {
                    url: USER_API.DELETE_USER(id),
                    method: 'delete',
                },
                {
                    onSuccess: async (response: any) => {
                        await queryCacheUtils.refetchQueries([QueryKeys.users]);
                        toast.error(response?.message || 'User deleted successfully!');
                        resolve(response);
                    },
                    onError: (error: any) => {
                        toast.error(error?.message || 'Failed to delete user!');

                        console.error('Delete failed:', error);
                        reject(error);
                    },
                },
            );
        });
    };

    return { tryAdd, tryDelete, tryUpdate };
};