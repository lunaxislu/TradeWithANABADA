import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../../API/supabase.api';

export const useInfiniteProducts = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => await getProducts(pageParam),
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length === 0) {
        return;
      } else {
        return allPage.length + 1;
      }
    },
  });
};
