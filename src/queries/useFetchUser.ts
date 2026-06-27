import { QueryKeys } from "src/constants/queryKeys";
import { IPaginationParams } from "src/interface/global.types";
import { USER_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchUser = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;

    const queryKey = [QueryKeys.users, page, limit, search || ""];

    return useListQuery<any[]>(
        queryKey,
        USER_API.GET_ALL_USERS,
        { page, limit, search },
    );
};