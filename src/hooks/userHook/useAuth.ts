import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginHandler, signupHandler } from '../../API/supabase.api';

const enum queryKey {
  SIGNUP = 'signup',
  LOGIN = 'login',
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 회원가입
  const signupMutation = useMutation({
    mutationFn: signupHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.SIGNUP] });
      navigate('/auth/login');
    },
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: loginHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.LOGIN] });
      navigate('/');
    },
  });

  return { signup: signupMutation.mutate, login: loginMutation.mutate };
};
