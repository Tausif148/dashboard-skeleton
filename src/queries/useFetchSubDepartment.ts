import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IPaginationParams } from 'src/interface/global.types';
import { SUB_DEPARTMENT_API } from 'src/services/endpoint';
import { useListQuery } from 'src/services/useListQuery';

export const useFetchSubDepartment = (params: IPaginationParams = {}): any => {
  const { page = 1, limit = 10, search = '' } = params;
  const { company_id } = useDecoded();

  const queryKey = [QueryKeys.subDepartment, company_id, page, limit, search || ''];

  return useListQuery<any[]>(queryKey, SUB_DEPARTMENT_API.GET_ALL_SUB_DEPARTMENTS, {
    page,
    limit,
    search,

    company_id: company_id,
  });
};
