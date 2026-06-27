

import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { IRole } from "src/interface/role.types";
import { ROLES_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";

export const useRoleActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: IRole) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: ROLES_API.CREATE_ROLE,
                method: "post",
                data: body,
            }, {
                onSuccess: async (response: any) => {
                    toast.success(response?.message || 'Role created successfully!');

                    await queryCacheUtils.refetchQueries([QueryKeys.role]);
                    resolve(response);

                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Creation failed');

                    reject(error);
                },
            });
        });
    };

    const tryUpdate = async (id: string, body: IRole) => {
        try {
            const response = await action.mutateAsync({
                url: ROLES_API.UPDATE_ROLE(id),
                method: "put",
                data: body,
            });

            toast.success(response?.message || 'Role updated successfully!');

            await queryCacheUtils.refetchQueries([QueryKeys.role]);
            return response;
        } catch (error: any) {
            toast.error(error?.message || 'Failed to udpate!');

            throw error;
        }
    };


    const tryDelete = async (id: string) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: ROLES_API.DELETE_ROLE(id),
                method: "delete",
            }, {
                onSuccess: async (response: any) => {
                    toast.error(response?.message || 'Deleted successfully!');

                    await queryCacheUtils.refetchQueries([QueryKeys.role]);
                    resolve(response);
                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Failed delete!');

                    console.error("Delete failed:", error);
                    reject(error);
                },
            });
        });
    };


    return { tryAdd, tryDelete, tryUpdate };
}