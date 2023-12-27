import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

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
    console.log('data: ', data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 로그인 상태 확인
 */
export const checkUser = async () => {
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // console.log('user: ', user);
  // return user;
  const { data, error } = await supabase.auth.getSession();
  console.log('data: ', data);
};
