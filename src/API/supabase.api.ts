import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

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
 * 유저 정보 가져오기 - DB에 저장되어있는 user의 정보
 * @returns 유저 정보
 */
export const getUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

/**
 * 유저 세션 가져오기 - 웹페이지에 머무르는 user의 정보
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


// product 상품등록 함수입니다.
export const addProductText = async (values: users) => {
  const userId = 'asdf';
  const createdAt = 'asdf';
  const { data, error } = await supabase.from('products').insert([
    {
      userId,
      createdAt,
    },
  ]);
};

export const addProductImage = async (file: File, uid: string, id: number) => {
  // 경로는 user_uid > post고유 id > createdAt > 이미지들
  if (file) {
    const { data, error } = await supabase.storage.from('product-images').upload('asdf/as/asdfasdf/asdf', file);
    console.log(data, error);
  }
};

// 상품 테이블 불러오기
export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  console.log('data: ', data);

/**
 * 상품 데이터 불러오기
 * @param page 페이지 번호
 * @returns 상품 목록
 */
export const getProducts = async (page: number) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .range(page * 10 - 10, page * 10 - 1);

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

// 최신 게시물 가져오기
export const getLatestProducts = async () => {
  const { data, error } = await supabase.rpc('get_latest_products');
  if (error) throw error;
  return data;
};

// 인기 게시물 가져오기 (like 수)
export const getPopularProducts = async () => {
  const { data, error } = await supabase.rpc('get_popular_products');
  if (error) throw error;
  return data;
};

// 유저 정보 변경하기
export const updateUserData = async (nickname: string) => {
  const { data, error } = await supabase.auth.updateUser({ data: { full_name: `${nickname}` } });
};

// 유저 프로필 사진 저장하기
export const uploadProfileImage = async (uid: string, file: File) => {
  try {
    // const fileName = `${uid}/${file.name}`;
    const fileName = `${uid}/img`;
    const { data, error } = await supabase.storage.from(`profile-images`).upload(fileName, file);
  } catch (error) {
    console.log(error);
  }
};

export const getImageUrl = async (uid: string) => {
  const { data, error } = await supabase.storage.from(`profile-images`).createSignedUrl(`${uid}/img`, 60);
  return data;
};

export const deleteImage = async (uid: string) => {
  const { data, error } = await supabase.storage.from(`profile-images`).remove([`${uid}/img`]);
};

export const downloadImage = async (uid: string): Promise<Blob | null> => {
  const { data, error } = await supabase.storage.from(`profile-images`).download(`${uid}/img`);
  return data;
};
