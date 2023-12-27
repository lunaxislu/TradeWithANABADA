import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkUser } from '../../API/supabase.api';
import { useAuth } from '../../hooks/userHook/useAuth';
import { useInput } from '../../hooks/userHook/useInput';

const Form = () => {
  const { signup, login } = useAuth();
  const params = useParams();
  const { value, onChange, isValid, emailErrorMessage, passwordErrorMessage } = useInput({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {params.auth === 'login' ? (
        <div>
          <h1>로그인</h1>
          <form>
            <input type="email" name="email" placeholder="이메일" value={value.email} onChange={onChange} />
            {emailErrorMessage && <span>{emailErrorMessage}</span>}
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={value.password}
              minLength={6}
              maxLength={10}
              onChange={onChange}
            />
          </form>
          {/* Button 컴포넌트 사용해야 합니다. */}
          <button
            type="submit"
            disabled={!isValid}
            onClick={(e) => {
              e.preventDefault();
              login(value);
            }}
          >
            로그인
          </button>
          <Link to="/auth/signup">회원가입</Link>
        </div>
      ) : (
        <div>
          <h1>회원가입</h1>
          <form>
            <input type="email" name="email" placeholder="이메일" value={value.email} onChange={onChange} required />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={value.password}
              minLength={6}
              maxLength={10}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
              value={value.passwordCheck}
              minLength={6}
              maxLength={10}
              onChange={onChange}
              required
            />
            {passwordErrorMessage && <span>{passwordErrorMessage}</span>}
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={value.nickname}
              onChange={onChange}
              required
            />
          </form>
          {/* Button 컴포넌트 사용해야 합니다. */}
          <button
            type="submit"
            disabled={!isValid}
            onClick={(e) => {
              e.preventDefault();
              signup(value);
            }}
          >
            회원가입
          </button>
          <Link to="/auth/login">로그인</Link>
        </div>
      )}
    </>
  );
};

export default Form;
