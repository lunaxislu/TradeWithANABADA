import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWishList } from '../../API/supabase.api';
import { QueryKey } from '../queryHook/useData';

export const useProfile = () => {
  const queryClient = useQueryClient();

  // 찜 목록 삭제
  const deleteWishListMutation = useMutation({
    mutationFn: deleteWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_WISH_LIST] });
    },
  });

  return { remove: deleteWishListMutation.mutate };
};
