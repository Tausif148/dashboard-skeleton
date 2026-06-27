// useCompanyActions 

import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { ICompany } from "src/interface/company.types";
import { COMPANIES_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";

export const useCompanyActions = () => {
    const action = useApiAction();

    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryAdd = async (body: ICompany) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: COMPANIES_API.CREATE_COMPANIES,
                method: "post",
                data: body,
            }, {
                onSuccess: async (response: any) => {
                    toast.success(response?.message || 'Hospitalcreated successfully!');
                    await queryCacheUtils.refetchQueries([QueryKeys.company]);
                    resolve(response);

                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Creation failed');

                    reject(error);
                },
            });
        });
    };

    const tryUpdate = async (id: string, body: ICompany) => {
        try {
            const response = await action.mutateAsync({
                url: COMPANIES_API.UPDATE_COMPANIES(id),
                method: "put",
                data: body,
            });

            toast.success(response?.message || 'Hospitalupdated successfully!');
            await queryCacheUtils.refetchQueries([QueryKeys.company]);
            return response;
        } catch (error: any) {
            toast.error(error?.message || 'Failed to update company!');
            throw error;
        }
    };


    const tryDelete = async (id: string) => {
        return new Promise((resolve, reject) => {
            action.mutateAsync({
                url: COMPANIES_API.DELETE_COMPANIES(id),
                method: "delete",
            }, {
                onSuccess: async (response: any) => {
                    toast.error(response?.message || 'Hospitaldeleted successfully!');
                    await queryCacheUtils.refetchQueries([QueryKeys.company]);
                    resolve(response);
                },
                onError: (error: any) => {
                    toast.error(error?.message || 'Failed to delete company!');
                    console.error("Delete failed:", error);
                    reject(error);
                },
            });
        });
    };

    return { tryAdd, tryDelete, tryUpdate };
}