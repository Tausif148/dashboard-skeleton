

import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { IAssignRole } from "src/interface/assignRole.type";
import { ASSIGN_MODULE_TO_ROLE_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";

export const useAssignRoleActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: IAssignRole) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: ASSIGN_MODULE_TO_ROLE_API.CREATE_ASSIGN_ROLES,
                method: "post",
                data: body,
            }, {
                onSuccess: async (response: any) => {
                    toast.success(response?.message || 'User asigned successfully!');

                    await queryCacheUtils.invalidateQueries([QueryKeys.assignRole]);
                    await queryCacheUtils.refetchQueries([QueryKeys.assignRole]);
                    resolve(response);

                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Creation failed');

                    reject(error);
                },
            });
        });
    };

    const tryUpdate = async (id: string, body: IAssignRole) => {
        try {
            const response = await action.mutateAsync({
                url: ASSIGN_MODULE_TO_ROLE_API.UPDATE_ASSIGN_ROLES(id),
                method: "put",
                data: body,
            });

            toast.success(response?.message || 'User asigned updated successfully!');

            await queryCacheUtils.invalidateQueries([QueryKeys.assignRole]);
            await queryCacheUtils.refetchQueries([QueryKeys.assignRole]);
            return response;
        } catch (error: any) {
            snackbar?.show({
                title: error?.error?.message || error?.message || "Failed to update",
                type: "error",
            });
            throw error;
        }
    };


    const tryDelete = async (id: string) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: ASSIGN_MODULE_TO_ROLE_API.DELETE_ASSIGN_ROLES(id),
                method: "delete",
            }, {
                onSuccess: async (response: any) => {
                    toast.error(response?.message || 'Assign deleted successfully!');

                    await queryCacheUtils.invalidateQueries([QueryKeys.assignRole]);
                    await queryCacheUtils.refetchQueries([QueryKeys.assignRole]);
                    resolve(response);
                },
                onError: (error: any) => {
                    snackbar?.show({
                        title: error?.error?.message || "Deletion failed",
                        type: "error",
                    });
                    console.error("Delete failed:", error);
                    reject(error);
                },
            });
        });
    };


    return { tryAdd, tryDelete, tryUpdate };
}