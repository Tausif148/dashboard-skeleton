import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import client from './client';

export interface IApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
  totalPages?: number;
}

// type GetApiFn<T> = (params: any) => Promise<IApiResponse<T>>;

export function useListQuery<T>(
  key: (string | number)[], // query key
  url: string, // API endpoint
  params: any = {},
  axiosConfig?: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>,
) {
  const fetchData: any = async (params: any) => {
    const data = await client.get<IApiResponse<T>>(url, {
      ...axiosConfig,
      params,
    });
    return data;
  };
  return useQuery<IApiResponse<T>>({
    queryKey: key,
    queryFn: () => fetchData(params),
    ...options,
  });
}
