import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IPaginationParams } from 'src/interface/global.types';
import { QUALIFICATION_API } from 'src/services/endpoint';
import { useListQuery } from 'src/services/useListQuery';

export const useFetchQualification = (params: IPaginationParams = {}): any => {
  const { page = 1, limit = 10, search = '' } = params;
  const { company_id } = useDecoded();

  const queryKey = [QueryKeys.qualifications, company_id, page, limit, search || ''];

  return useListQuery<any[]>(
    queryKey,
    QUALIFICATION_API.GET_ALL_QUALIFICATIONS,
    {
      page,
      limit,
      search,
      company_id: company_id,
    },
    undefined,
    {
      enabled: company_id > 0,
    },
  );
};
