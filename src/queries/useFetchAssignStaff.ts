import { QueryKeys } from "src/constants/queryKeys";
import useDecoded from 'src/hooks/useDecoded';
import { IPaginationParams } from "src/interface/global.types";
import { ASSIGN_ROLE_TO_EMPLOYEE_API } from "src/services/endpoint";
import { useListQuery } from "src/services/useListQuery";

export const useFetchAssignStaff = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = "" } = params;
    const { company_id } = useDecoded();

    const queryKey = [QueryKeys.assignStaff, company_id, page, limit, search || ''];

    return useListQuery<any[]>(
        queryKey,
        ASSIGN_ROLE_TO_EMPLOYEE_API.GET_ALL_ASSIGN_STAFF,
        { page, limit, search, company_id },

    );
};