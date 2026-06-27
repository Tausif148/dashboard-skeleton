import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { ISubDepartment } from "src/interface/subDepartment.types";
import { SUB_DEPARTMENT_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";

export const useSubDepartmentActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: ISubDepartment) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: SUB_DEPARTMENT_API.CREATE_SUB_DEPARTMENT,
                method: "post",
                data: body,
            }, {
                onSuccess: async (response: any) => {
                    toast.success(response?.message || 'Sub Departments added successfully');

                    await queryCacheUtils.refetchQueries([QueryKeys.subDepartment]);
                    resolve(response);

                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Creation failed');

                    reject(error);
                },
            });
        });
    };

    const tryUpdate = async (id: string, body: ISubDepartment) => {
        try {
            const response = await action.mutateAsync({
                url: SUB_DEPARTMENT_API.UPDATE_SUB_DEPARTMENT(id),
                method: "put",
                data: body,
            });

            toast.success(response?.message || 'Sub Departments updated successfully');

            await queryCacheUtils.refetchQueries([QueryKeys.subDepartment]);
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
                url: SUB_DEPARTMENT_API.DELETE_SUB_DEPARTMENT(id),
                method: "delete",
            }, {
                onSuccess: async (response: any) => {
                    snackbar?.show({
                        title: response?.message || "Deleted successfully",
                        type: "error",
                    });
                    await queryCacheUtils.refetchQueries([QueryKeys.subDepartment]);
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