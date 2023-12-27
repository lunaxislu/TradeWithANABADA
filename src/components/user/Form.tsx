import { Link, Navigate, useParams } from 'react-router-dom';
import { resetPasswordHandler, signInWithProvider } from '../../API/supabase.api';
import { useAuth } from '../../hooks/userHook/useAuth';
import { useInput } from '../../hooks/userHook/useInput';

/**
 * TODO
 * 1. 버튼 컴포넌트 사용해야 합니다.
 * 2. 구글, 카카오 로고 넣어야 합니다.
 * 3. 리팩토링 필요합니다.
 * @returns 회원가입, 로그인, 비밀번호 메일 전송, 비밀번호 변경 Form
 */
const Form = () => {
  const { signup, login, updatePassword } = useAuth();
  const params = useParams();
  const { value, onChange, reset, isValid, emailErrorMessage, passwordErrorMessage } = useInput({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  });

  return (
    <>
      {(() => {
        switch (params.auth) {
          case 'login':
            return (
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
                    reset();
                    login(value);
                  }}
                >
                  로그인
                </button>
                {/* 구글, 카카오 로고 넣어야 합니다. */}
                <button onClick={() => signInWithProvider('google')}>구글</button>
                <button onClick={() => signInWithProvider('kakao')}>카카오</button>
                <Link to="/auth/signup" onClick={reset}>
                  회원가입
                </Link>
                <br />
                <Link to="/auth/sendMail" onClick={reset}>
                  비밀번호 변경
                </Link>
              </div>
            );
          case 'signup':
            return (
              <div>
                <h1>회원가입</h1>
                <form>
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={value.email}
                    onChange={onChange}
                    required
                  />
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
                  <input type="text" name="name" placeholder="닉네임" value={value.name} onChange={onChange} required />
                </form>
                {/* Button 컴포넌트 사용해야 합니다. */}
                <button
                  type="submit"
                  disabled={!isValid}
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                    signup(value);
                  }}
                >
                  회원가입
                </button>
                <Link to="/auth/login" onClick={reset}>
                  로그인
                </Link>
              </div>
            );
          case 'sendMail':
            return (
              <div>
                <h1>비밀번호 변경 메일 보내기</h1>
                <form>
                  <input type="email" name="email" placeholder="이메일" value={value.email} onChange={onChange} />
                  {emailErrorMessage && <span>{emailErrorMessage}</span>}
                </form>
                <button
                  type="submit"
                  disabled={!isValid}
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                    resetPasswordHandler(value);
                  }}
                >
                  변경
                </button>
              </div>
            );
          case 'reset':
            return (
              <div>
                <h1>비밀번호 변경 페이지</h1>
                <form>
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
                </form>
                <button
                  type="submit"
                  disabled={!isValid}
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                    updatePassword(value);
                  }}
                >
                  변경
                </button>
              </div>
            );
          default:
            return <Navigate to="/auth/login" replace />;
        }
      })()}
    </>
  );
};

export default Form;
