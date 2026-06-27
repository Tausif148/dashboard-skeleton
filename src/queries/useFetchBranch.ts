import { QueryKeys } from "src/constants/queryKeys";
import { IPaginationParams } from "src/interface/global.types";
import { BRANCH_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchBranch = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;

    const queryKey = [QueryKeys.branches, page, limit, search||""];

    return useListQuery<any[]>(
        queryKey,
    BRANCH_API.GET_ALL_BRANCHES,
        { page, limit, search }, 

    );
};