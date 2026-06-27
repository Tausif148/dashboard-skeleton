import { QueryKeys } from "src/constants/queryKeys";
import { IPaginationParams } from "src/interface/global.types";
import { MENU_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchMenu = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;

    const queryKey = [QueryKeys.menus, page, limit, search||""];

    return useListQuery<any[]>(
        queryKey,
    MENU_API.GET_ALL_MENUS,
        { page, limit, search }, 

    );
};