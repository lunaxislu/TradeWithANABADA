import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// TODO: 나중에 따로 분리
type users = Record<string, string>;

/**
 * 회원가입
 * @param values 이메일, 비밀번호, 닉네임
 */
export const signupHandler = async (values: users) => {
  const { email, password, nickname } = values;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 로그인
 * @param values 이메일, 비밀번호
 */
export const loginHandler = async (values: users) => {
  const { email, password } = values;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

/**
 * 소셜 로그인
 * @param provider 구글, 카카오
 */
export const signInWithProvider = async (provider: 'google' | 'kakao') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;
  console.log('로그인한 사용자:', data);
};
/**
 * 로그아웃
 */
export const logoutHandler = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * 유저 정보 가져오기
 * @returns 유저 정보
 */
export const getUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

/**
 * 유저 세션 가져오기
 * @returns 유저 세션
 */
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};
