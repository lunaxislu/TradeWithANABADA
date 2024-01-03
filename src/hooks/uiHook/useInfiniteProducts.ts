import { useInfiniteQuery } from '@tanstack/react-query';
import { getCategoryWithOneDepth, getLatestProducts, getPopularProducts, searchProducts } from '../../API/supabase.api';

export const useInfiniteProducts = (keyword: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['products', keyword], // keyword가 바뀔 때마다 새로운 데이터를 가져옴
    queryFn: async ({ pageParam = 1 }) => {
      switch (keyword) {
        case '최신 상품':
          return await getLatestProducts(pageParam);
        case '실시간 인기 상품':
          return await getPopularProducts(pageParam);
        case '여성의류':
          return await getCategoryWithOneDepth(pageParam, keyword);
        case '남성의류':
          return await getCategoryWithOneDepth(pageParam, keyword);
        case '신발':
          return await getCategoryWithOneDepth(pageParam, keyword);
        case '쥬얼리':
          return await getCategoryWithOneDepth(pageParam, keyword);
        case '디지털':
          return await getCategoryWithOneDepth(pageParam, keyword);
        case '가전의류':
          return await getCategoryWithOneDepth(pageParam, keyword);
        case '도서':
          return await getCategoryWithOneDepth(pageParam, keyword);
        default:
          return await searchProducts(pageParam, keyword);
      }
    },
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage?.length === 0) {
        return;
      } else {
        return allPage.length + 1;
      }
    },
  });
};
