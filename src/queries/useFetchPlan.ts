import { QueryKeys } from 'src/constants/queryKeys';
import { IPaginationParams } from 'src/interface/global.types';
import { PLAN_API } from 'src/services/endpoint';
import { useListQuery } from 'src/services/useListQuery';

export const useFetchPlan = (params: IPaginationParams = {}): any => {
  const { page = 1, limit = 10, search = '' } = params;

  const queryKey = [QueryKeys.plans, page, limit, search || ''];

  return useListQuery<any[]>(queryKey, PLAN_API.GET_ALL_PLANS, { page, limit, search });
};
