import { useErrorBoundary } from 'react-error-boundary';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { resetPasswordHandler, signInWithProvider } from '../../API/supabase.api';
import { useAuth } from '../../hooks/userHook/useAuth';
import { useInput } from '../../hooks/userHook/useInput';
import { ReactComponent as Google } from '../../styles/assets/google.svg';
import { ReactComponent as Kakao } from '../../styles/assets/kakao.svg';
import * as St from './Form.styled';

export type Users = Record<string, string>;

/**
 * @description TODO: 리팩토링 필요합니다.
 * @returns 회원가입, 로그인, 비밀번호 메일 전송, 비밀번호 변경 Form
 */
const Form = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { signup, login, updatePassword } = useAuth();
  const { showBoundary } = useErrorBoundary();
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
                <St.ButtonWrapper $active={!isValid}>
                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={(e) => {
                      try {
                        e.preventDefault();
                        reset();
                        login(value);
                      } catch (error) {
                        showBoundary(error);
                      }
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
                    <Google onClick={() => signInWithProvider('google')} />
                    <Kakao onClick={() => signInWithProvider('kakao')} />
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
                      try {
                        e.preventDefault();
                        reset();
                        signup(value);
                      } catch (error) {
                        showBoundary(error);
                      }
                    }}
                  >
                    회원가입
                  </button>
                  <St.SocialButtonWrapper>
                    <Google onClick={() => signInWithProvider('google')} />
                    <Kakao onClick={() => signInWithProvider('kakao')} />
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
