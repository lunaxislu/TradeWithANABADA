import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { resetPasswordHandler, signInWithProvider } from '../../API/supabase.api';
import { useAuth } from '../../hooks/userHook/useAuth';
import { useInput } from '../../hooks/userHook/useInput';
import * as St from './Form.styled';

/**
 * TODO
 * 1. 버튼 컴포넌트 사용해야 합니다.
 * 2. 구글, 카카오 로고 넣어야 합니다.
 * 3. 리팩토링 필요합니다.
 * @description 회원가입, 로그인, 비밀번호 메일 전송, 비밀번호 변경 따로 분리하지 않고 하나의 컴포넌트로 구현했습니다.
 * @returns 회원가입, 로그인, 비밀번호 메일 전송, 비밀번호 변경 Form
 */
const Form = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { signup, login, updatePassword } = useAuth();
  const { value, onChange, reset, isValid, emailErrorMessage, passwordErrorMessage } = useInput({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  });

  return (
    <St.FormWrapper>
      {(() => {
        switch (params.auth) {
          case 'login':
            return (
              <>
                <St.Logo>
                  <Link to="/">ANABADA</Link>
                </St.Logo>
                {/* <St.Logo onClick={() => navigate('/')}>ANABADA</St.Logo> */}
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
                <St.ButtonWrapper $active={!isValid}>
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
                  <div>
                    비밀번호를 잊으셨나요?
                    <Link to="/auth/sendMail" onClick={reset}>
                      비밀번호 찾기
                    </Link>
                  </div>
                  <St.SocialButtonWrapper>
                    <img
                      src="https://developers.google.com/static/identity/images/g-logo.png?hl=ko"
                      alt=""
                      onClick={() => signInWithProvider('google')}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/images/k-logo.png'}
                      alt=""
                      onClick={() => signInWithProvider('kakao')}
                    />
                  </St.SocialButtonWrapper>
                  <St.CaptionWrapper>
                    <St.P1>아직 회원이 아니신가요?</St.P1>
                    <St.P2>ANABADA와 함께</St.P2>
                    <St.P2>안 쓰는 물건을 새 물건으로 교환해 보세요</St.P2>
                    <div
                      onClick={() => {
                        navigate('/auth/signup');
                        reset();
                      }}
                    >
                      회원가입
                    </div>
                  </St.CaptionWrapper>
                </St.ButtonWrapper>
              </>
            );
          case 'signup':
            return (
              <div>
                <St.Logo>
                  <Link to="/">ANABADA</Link>
                </St.Logo>
                <form>
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={value.email}
                    onChange={onChange}
                    required
                  />
                  {emailErrorMessage && <span>{emailErrorMessage}</span>}
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
                <St.ButtonWrapper $active={!isValid}>
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
                  <St.SocialButtonWrapper>
                    <img
                      src="https://developers.google.com/static/identity/images/g-logo.png?hl=ko"
                      alt=""
                      onClick={() => signInWithProvider('google')}
                    />
                    <img
                      src={process.env.PUBLIC_URL + '/images/k-logo.png'}
                      alt=""
                      onClick={() => signInWithProvider('kakao')}
                    />
                  </St.SocialButtonWrapper>
                  <St.CaptionWrapper>
                    <St.P1>이미 회원이신가요?</St.P1>
                    <St.P2>ANABADA와 함께</St.P2>
                    <St.P2>안 쓰는 물건을 새 물건으로 교환해 보세요</St.P2>
                    <div
                      onClick={() => {
                        navigate('/auth/login');
                        reset();
                      }}
                    >
                      로그인
                    </div>
                  </St.CaptionWrapper>
                </St.ButtonWrapper>
              </div>
            );
          case 'sendMail':
            return (
              <div>
                <St.Logo>
                  <Link to="/">ANABADA</Link>
                </St.Logo>
                <h2>비밀번호 변경 메일 보내기</h2>
                <form>
                  <input type="email" name="email" placeholder="이메일" value={value.email} onChange={onChange} />
                  {emailErrorMessage && <span>{emailErrorMessage}</span>}
                </form>
                <St.ButtonWrapper $active={!isValid}>
                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={(e) => {
                      e.preventDefault();
                      reset();
                      resetPasswordHandler(value);
                    }}
                  >
                    이메일 전송
                  </button>
                </St.ButtonWrapper>
              </div>
            );
          case 'reset':
            return (
              <div>
                <St.Logo>
                  <Link to="/">ANABADA</Link>
                </St.Logo>
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
    </St.FormWrapper>
  );
};

export default Form;
