// src/utils/queryCacheUtils.ts
import { QueryClient, QueryKey } from "@tanstack/react-query";

export class QueryCacheUtils {
    private queryClient: QueryClient;

    constructor(queryClient: QueryClient) {
        this.queryClient = queryClient;
    }

    /**
     * Generic function to refetch queries
     * @param queryKey - The query key to refetch
     */
    async refetchQueries(queryKey: QueryKey): Promise<void> {
        await this.queryClient.refetchQueries({
            queryKey,
        });
    }

    /**
     * Generic function to invalidate queries
     * @param queryKey - The query key to invalidate
     */
    async invalidateQueries(queryKey: QueryKey): Promise<void> {
        await this.queryClient.invalidateQueries({
            queryKey,
        });
    }

    /**
     * Generic function to update query data
     * @param queryKey - The query key to update
     * @param updater - Function that receives old data and returns new data
     */
    updateQueryData<T>(
        queryKey: QueryKey,
        updater: (oldData: T | undefined) => T | undefined
    ): void {
        this.queryClient.setQueryData(queryKey, updater);
    }

    /**
     * Optimistic update with rollback capability
     * @param queryKey - The query key to update
     * @param updater - Function that receives old data and returns new data
     * @param options - { onSuccess, onError } callbacks
     */
    async optimisticUpdate<T>(
        queryKey: QueryKey,
        updater: (oldData: T | undefined) => T,
        options: {
            onSuccess?: (data: T) => void;
            onError?: (error: unknown) => void;
        } = {}
    ): Promise<void> {
        // Cancel any outgoing refetches to avoid overwriting our optimistic update
        await this.queryClient.cancelQueries({ queryKey });

        // Snapshot the previous value
        const previousData = this.queryClient.getQueryData<T>(queryKey);

        // Optimistically update to the new value
        this.updateQueryData(queryKey, updater);

        try {
            // If successful, optional onSuccess callback
            if (options.onSuccess) {
                options.onSuccess(updater(previousData));
            }
        } catch (error) {
            // On error, roll back to previous value
            this.updateQueryData(queryKey, () => previousData);

            // Optional onError callback
            if (options.onError) {
                options.onError(error);
            }
        }
    }
}

// Usage example:
// const queryCacheUtils = new QueryCacheUtils(queryClient);
// await queryCacheUtils.refetchQueries([QueryKeys.scoringParameters]);
// queryCacheUtils.updateQueryData<ScoringParameters>([QueryKeys.scoringParameters], (old) => ({ ...old, updated: true }));