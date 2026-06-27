import { QueryKeys } from "src/constants/queryKeys";
import { IPaginationParams } from "src/interface/global.types";
import { ASSIGN_MODULE_MENU_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchAssignModuleMenu = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;

    const queryKey = [QueryKeys.assignModuleMenu, page, limit, search||""];

    return useListQuery<any[]>(
        queryKey,
    ASSIGN_MODULE_MENU_API.GET_ALL_ASSIGN_MODULE_MENU,
        { page, limit, search }, 

    );
};