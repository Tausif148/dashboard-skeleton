import { QueryKeys } from "src/constants/queryKeys";
import { IPaginationParams } from "src/interface/global.types";
import { MODULE_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchModule = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;

    const queryKey = [QueryKeys.modules, page, limit, search||""];

    return useListQuery<any[]>(
        queryKey,
    MODULE_API.GET_ALL_MODULES,
        { page, limit, search }, 

    );
};