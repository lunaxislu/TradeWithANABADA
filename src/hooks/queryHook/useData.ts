import { useQuery } from '@tanstack/react-query';
import { getSalesList, getUserSession, getWishList } from '../../API/supabase.api';

export enum QueryKey {
  GET_WISH_LIST = 'getWishList',
  GET_SALES_LIST = 'getSalesList',
}

export const useData = () => {
  // 찜 목록 불러오기
  const { data: wishList, isLoading: wishListLoading } = useQuery({
    queryKey: [QueryKey.GET_WISH_LIST],
    queryFn: async () => {
      const session = await getUserSession();
      const userId = session.session?.user.id;
      return userId ? await getWishList(userId) : [];
    },
  });

  // 판매 목록 불러오기
  const { data: salesList, isLoading: salesListLoading } = useQuery({
    queryKey: [QueryKey.GET_SALES_LIST],
    queryFn: async () => {
      const session = await getUserSession();
      const userId = session.session?.user.id;
      return userId ? await getSalesList(userId) : [];
    },
  });

  return { wishList, wishListLoading, salesList, salesListLoading };
};
