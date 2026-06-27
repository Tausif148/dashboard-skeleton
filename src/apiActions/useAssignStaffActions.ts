

import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { IAssignStaff } from "src/interface/assignStaff.type";
import { ASSIGN_ROLE_TO_EMPLOYEE_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";


export const useAssignStaffActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: IAssignStaff) => {
        try {
            const response: any = await action.mutateAsync({
                url: ASSIGN_ROLE_TO_EMPLOYEE_API.CREATE_ASSIGN_STAFF,
                method: "post",
                data: body,
            });
            snackbar?.show({
                title: response?.message || "Created successful",
                type: "success",
            });
            await queryCacheUtils.invalidateQueries([QueryKeys.assignStaff]);
            await queryCacheUtils.invalidateQueries([QueryKeys.assignRole]);
            await queryCacheUtils.invalidateQueries([QueryKeys.assignModuleMenu]);
            await queryCacheUtils.refetchQueries([QueryKeys.assignStaff]);
            return response;
        } catch (error: any) {
            toast.error(error?.message || 'Creation failed');
            throw error;
        }
    };

    const tryUpdate = async (id: string, body: IAssignStaff) => {
        try {
            const response = await action.mutateAsync({
                url: ASSIGN_ROLE_TO_EMPLOYEE_API.UPDATE_ASSIGN_STAFF(id),
                method: "put",
                data: body,
            });

            snackbar?.show({
                title: response?.message || "Updated successfully",
                type: "warning",
            });
            await queryCacheUtils.invalidateQueries([QueryKeys.assignStaff]);
            await queryCacheUtils.invalidateQueries([QueryKeys.assignRole]);
            await queryCacheUtils.invalidateQueries([QueryKeys.assignModuleMenu]);
            await queryCacheUtils.refetchQueries([QueryKeys.assignStaff]);
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
        try {
            const response: any = await action.mutateAsync({
                url: ASSIGN_ROLE_TO_EMPLOYEE_API.DELETE_ASSIGN_STAFF(id),
                method: "delete",
            });
            snackbar?.show({
                title: response?.message || "Deleted successfully",
                type: "error",
            });
            await queryCacheUtils.invalidateQueries([QueryKeys.assignStaff]);
            await queryCacheUtils.invalidateQueries([QueryKeys.assignRole]);
            await queryCacheUtils.invalidateQueries([QueryKeys.assignModuleMenu]);
            await queryCacheUtils.refetchQueries([QueryKeys.assignStaff]);
            return response;
        } catch (error: any) {
            snackbar?.show({
                title: error?.error?.message || "Deletion failed",
                type: "error",
            });
            console.error("Delete failed:", error);
            throw error;
        }
    };


    return { tryAdd, tryDelete, tryUpdate };
}