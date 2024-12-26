import { useInfiniteQuery } from '@tanstack/react-query'

import { PopularService, FeatureResults } from '@/Services'

export const usePopularMovies = () => {
  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery<FeatureResults[], Error>({
    queryKey: ['popular', 'movies'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      (
        await PopularService.Movies({
          query: {
            page: pageParam as number,
          },
        })
      ).results,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined
      return pages.length + 1
    }
  })

  const handleLoadMore = async () => {
    await fetchNextPage()
  }

  const combinedData = data?.pages.flat() || []

  return { data: combinedData, error, isLoading, handleLoadMore }
}
