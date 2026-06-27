

import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { toast } from 'react-toastify';
import { IBranch } from "src/interface/branch.types";
import { BRANCH_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";

export const useBranchActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: IBranch) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: BRANCH_API.CREATE_BRANCH,
                method: "post",
                data: body,
            }, {
                onSuccess: async (response: any) => {
                    snackbar?.show({
                        title: response.message || "Created successful",
                        type: "success",
                    });
                    await queryCacheUtils.refetchQueries([QueryKeys.branches]);
                    resolve(response);

                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Creation failed');

                    reject(error);
                },
            });
        });
    };

    const tryUpdate = async (id: string, body: IBranch) => {
        try {
            const response = await action.mutateAsync({
                url: BRANCH_API.UPDATE_BRANCH(id),
                method: "put",
                data: body,
            });

            snackbar?.show({
                title: response?.message || "Updated successfully",
                type: "warning",
            });
            await queryCacheUtils.refetchQueries([QueryKeys.branches]);
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
                url: BRANCH_API.DELETE_BRANCH(id),
                method: "delete",
            }, {
                onSuccess: async (response: any) => {
                    snackbar?.show({
                        title: response?.message || "Deleted successfully",
                        type: "error",
                    });
                    await queryCacheUtils.refetchQueries([QueryKeys.branches]);
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