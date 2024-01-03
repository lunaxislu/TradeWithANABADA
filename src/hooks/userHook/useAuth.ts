import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import {
  getUserData,
  loginHandler,
  logoutHandler,
  saveUser,
  signupHandler,
  supabase,
  updatePasswordHandler,
} from '../../API/supabase.api';
import { Users } from '../../components/user/Form';

const enum queryKey {
  SIGNUP = 'signup',
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE_PASSWORD = 'updatePassword',
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  // 회원가입
  const signupMutation = useMutation({
    mutationFn: signupHandler,
    onSuccess: async () => {
      try {
        queryClient.invalidateQueries({ queryKey: [queryKey.SIGNUP] });
        const token = await getUserData();
        const info = {
          id: token?.id,
          email: token?.email,
          created_at: new Date().toISOString(),
          full_name: token?.user_metadata.full_name,
          avatar_img: token?.user_metadata.avatar_img,
        };
        await saveUser(info as Users);
        navigate('/auth/login');
      } catch (error) {
        showBoundary(error);
      }
    },
    onError: (error) => showBoundary(error),
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: loginHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.LOGIN] });
      navigate('/');
    },
    onError: (error) => {
      showBoundary(error);
    },
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await supabase.removeAllChannels();
      logoutHandler();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.LOGOUT] });
      navigate('/');
    },
    onError: (error) => {
      showBoundary(error);
    },
  });

  // 비밀번호 변경
  const updatePasswordMutation = useMutation({
    mutationFn: updatePasswordHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.UPDATE_PASSWORD] });
      navigate('/auth/login');
    },
    onError: (error) => {
      showBoundary(error);
    },
  });

  return {
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
  };
};
