import { useQuery } from '@tanstack/react-query';
import { getSalesList, getUserSession, getWishList } from '../../../API/supabase.api';

export const enum QueryKey {
  SESSION = 'session',
  WISH_LIST = 'getWishList',
  SALES_LIST = 'getSalesList',
  REVIEW_LIST = 'getReviewList',
}

export const useData = () => {
  const { data: session } = useQuery({
    queryKey: [QueryKey.SESSION],
    queryFn: getUserSession,
  });
  const userId = session?.session?.user.id;

  // 찜 목록 불러오기
  const { data: wishList, isLoading: wishListLoading } = useQuery({
    queryKey: [QueryKey.WISH_LIST],
    queryFn: async () => {
      return userId ? await getWishList(userId) : [];
    },
    enabled: !!userId,
  });

  // 판매 목록 불러오기
  const { data: salesList, isLoading: salesListLoading } = useQuery({
    queryKey: [QueryKey.SALES_LIST],
    queryFn: async () => {
      return userId ? await getSalesList(userId) : [];
    },
    enabled: !!userId,
  });

  return { wishList, wishListLoading, salesList, salesListLoading };
};
