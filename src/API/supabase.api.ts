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
  const { email, password, name } = values;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
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

/**
 * 비밀번호 변경 메일 보내기
 * @param email 비밀번호 변경 메일받을 이메일
 */
export const resetPasswordHandler = async (values: users) => {
  const { email } = values;
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/reset', // 비밀번호 찾기 페이지로 이동
    });
    if (!error) {
      alert('메일이 전송되었습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 비밀번호 변경
 * @param password 변경할 비밀번호
 */
export const updatePasswordHandler = async (values: users) => {
  const { password } = values;
  console.log('password: ', password);
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (data) {
    alert('비밀번호 변경이 완료되었습니다.');
  }
  if (error) alert('There was an error updating your password.');
};

// 상품 테이블 불러오기
export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  console.log('data: ', data);
  if (error) throw error;
  return data;
};

/**
 * 검색 기능
 * @param keyword 검색어
 * @returns 검색 결과
 */
export const searchProducts = async (keyword: string) => {
  // 상품 title, content에서 keyword 검색, 예를 들어 keyword가 '테스트'라면 '테스'로도 검색됨
  // const { data: titleData, error: titleError } = await supabase
  //   .from('products')
  //   .select('*')
  //   .like('title', `${keyword}%`);
  // const { data: contentData, error: contentError } = await supabase
  //   .from('products')
  //   .select('*')
  //   .like('content', `${keyword}%`);

  const { data: titleData, error: titleError } = await supabase
    .from('products')
    .select('*')
    .textSearch('title', keyword, {
      type: 'websearch',
    });

  const { data: contentData, error: contentError } = await supabase
    .from('products')
    .select('*')
    .textSearch('content', keyword, {
      type: 'websearch',
    });

  if (titleError || contentError) throw titleError || contentError;

  const mergedData = [...titleData, ...contentData];

  return mergedData;
};
