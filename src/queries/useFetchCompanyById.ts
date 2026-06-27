import { QueryKeys } from 'src/constants/queryKeys';
import { COMPANIES_API } from 'src/services/endpoint';
import { useListQuery } from 'src/services/useListQuery';

// Define an interface for the query parameters based on the Swagger doc
interface IFetchCompanyParams {
    company_id?: number | null;
}

export const useFetchCompanyById = (params: IFetchCompanyParams = {}): any => {
    const { company_id = null } = params;

    // Include company_id in the query key to trigger a refetch when the ID changes
    const queryKey = [QueryKeys.company, company_id ?? 'all'];

    return useListQuery<any[]>(
        queryKey,
        COMPANIES_API.GET_ALL_COMPANIES, // Points to /api/v1/companies/
        { company_id }, // Passed as the query parameter object
    );
};