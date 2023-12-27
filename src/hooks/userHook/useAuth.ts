import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginHandler, logoutHandler, signupHandler, updatePasswordHandler } from '../../API/supabase.api';

const enum queryKey {
  SIGNUP = 'signup',
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE_PASSWORD = 'updatePassword',
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

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: logoutHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.LOGOUT] });
      navigate('/auth/login');
    },
  });

  // 비밀번호 변경
  const updatePasswordMutation = useMutation({
    mutationFn: updatePasswordHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.UPDATE_PASSWORD] });
      navigate('/auth/login');
    },
  });

  return {
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
  };
};
