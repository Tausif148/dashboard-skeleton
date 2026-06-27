import { QueryKeys } from "src/constants/queryKeys";
import { IPaginationParams } from "src/interface/global.types";
import { COMPANIES_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchCompany = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;

    const queryKey = [QueryKeys.company, page, limit, search || ""];

    return useListQuery<any[]>(
        queryKey,
        COMPANIES_API.GET_ALL_COMPANIES,
        { page, limit, search },

    );
};