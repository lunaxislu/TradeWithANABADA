import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertReview, updateReview } from './../../../API/supabase.api';
import { QueryKey } from './useData';

export const useReview = () => {
  const queryClient = useQueryClient();

  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.REVIEW_LIST] });
    },
  });

  const insertReviewMutation = useMutation({
    mutationFn: insertReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.REVIEW_LIST] });
    },
  });

  return { update: updateReviewMutation.mutate, insert: insertReviewMutation.mutate };
};
