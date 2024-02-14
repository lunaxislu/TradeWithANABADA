import { useInfiniteQuery } from '@tanstack/react-query';
import { getCategoryWithOneDepth, getLatestProducts, getPopularProducts, searchProducts } from '../../API/supabase.api';

export const useInfiniteProducts = (keyword: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['products', keyword], // keyword가 바뀔 때마다 새로운 데이터를 가져옴
    queryFn: async ({ pageParam = 1 }) => {
      const productCategories = ['여성의류', '남성의류', '신발', '쥬얼리', '디지털', '가전의류', '도서'];

      if (keyword === '최신 상품') return await getLatestProducts(pageParam);
      if (keyword === '실시간 인기 상품') return await getPopularProducts(pageParam);
      if (productCategories.includes(keyword)) return await getCategoryWithOneDepth(pageParam, keyword);

      return await searchProducts(pageParam, keyword);
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
