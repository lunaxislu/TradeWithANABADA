import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts } from '../../API/supabase.api';

export const useInfiniteProducts = (keyword: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['products', keyword],
    queryFn: async ({ pageParam = 1 }) => await searchProducts(pageParam, keyword),
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length === 0) {
        return;
      } else {
        return allPage.length + 1;
      }
    },
  });
};
