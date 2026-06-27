import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IPaginationParams } from 'src/interface/global.types';
import { MANPOWER_API } from 'src/services/endpoint';
import { useListQuery } from 'src/services/useListQuery';

export const useFetchStaffCreation = (params: IPaginationParams = {}): any => {
    const { page = 1, limit = 10, search = '' } = params;
    const { company_id } = useDecoded();

    const queryKey = [QueryKeys.manpower, company_id, page, limit, search || ''];

    return useListQuery<any[]>(queryKey, MANPOWER_API.GET_ALL_MANPOWER, {
        page,
        limit,
        search,
        company_id: company_id,
    });
};
