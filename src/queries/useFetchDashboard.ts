//  useFetchDashboard.ts


import { QueryKeys } from 'src/constants/queryKeys';
import useDecoded from 'src/hooks/useDecoded';
import { IPaginationParams } from 'src/interface/global.types';
import { DASHBOARD_API } from 'src/services/endpoint';
import { useListQuery } from 'src/services/useListQuery';

export const useFetchDashboardReport = (params: IPaginationParams = {}): any => {
  const {
    page = 1,
    limit = 10,
    search = '',
    from_date,
    to_date,
  } = params;
  const { company_id } = useDecoded();

  // Include dates in the query key so React Query refetches when they change
  const queryKey = [
    QueryKeys.dashboardReport,
    company_id,
    page,
    limit,
    search,
    from_date ?? '',
    to_date ?? '',
  ];

  // Only include date params in the request when they actually have a value
  const queryParams = {
    page,
    limit,
    search,
    company_id,
    ...(from_date ? { from_date } : {}),
    ...(to_date ? { to_date } : {}),

  };

  return useListQuery<any[]>(queryKey, DASHBOARD_API.GET_DASHBOARD, queryParams);
};