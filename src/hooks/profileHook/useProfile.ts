import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWishList, updateOnSaleToSoldOut } from '../../API/supabase.api';
import { QueryKey } from '../queryHook/profile/useData';

export const useProfile = () => {
  const queryClient = useQueryClient();

  // 찜 목록 삭제
  const deleteWishListMutation = useMutation({
    mutationFn: deleteWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.WISH_LIST] });
    },
  });

  // 판매 중 => 판매 완료로 상태 변경
  const updateOnSaleToSoldOutMutation = useMutation({
    mutationFn: updateOnSaleToSoldOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.SALES_LIST] });
    },
  });

  return { remove: deleteWishListMutation.mutate, update: updateOnSaleToSoldOutMutation.mutate };
};
