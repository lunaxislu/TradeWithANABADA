import { useQuery } from '@tanstack/react-query';
import { getPurchaseLists, getSalesList, getUserSession, getWishList } from '../../../API/supabase.api';

export const enum QueryKey {
  GET_WISH_LIST = 'getWishList',
  GET_SALES_LIST = 'getSalesList',
  GET_REVIEW_LIST = 'getReviewList',
  GET_PURCHASE_LIST = 'getPurchaseList',
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

  // 구매 목록 불러오기
  const { data: purchaseList, isLoading: purchaseListLoading } = useQuery({
    queryKey: [QueryKey.GET_PURCHASE_LIST],
    queryFn: async () => {
      const session = await getUserSession();
      const userId = session.session?.user.id;
      return userId ? await getPurchaseLists(userId) : [];
    },
  });

  return { wishList, wishListLoading, salesList, salesListLoading, purchaseList };
};
