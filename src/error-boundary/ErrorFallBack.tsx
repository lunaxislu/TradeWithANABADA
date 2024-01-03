import { ErrorInfo } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { postSlackApiWithError } from '../API/slack.api';
import { Button } from '../components/ui/Button';
import * as St from './withErrorBound.styled';

/**
 * 코드 분할을 하지 못해 너무 아쉽습니다.. by 최문길...
 * @param param0
 * @returns
 */
export const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  // console.log(error.statusCode);
  if (error.name === 'AuthApiError') {
    return (
      <St.ErrorUi>
        <St.Wrapper>
          <div>로그인 시도하는데...</div>
          <div>{error.message}라는 문제가 발생하였습니다.</div>
          <p style={{ color: '#000' }}>
            혹시 에러를 만드시는게 취미입니까? <br />
            로그인으로 돌아가서 다시 접속해주세요
          </p>
          <Button color="warning" onClick={() => resetErrorBoundary('/auth/login')}>
            로그인페이지로 이동
          </Button>
        </St.Wrapper>
      </St.ErrorUi>
    );
  }
  if (error.code || error.status) {
    return (
      <St.ErrorUi>
        <St.Wrapper>
          <div>서버와 연결이 안정적이지 못하여</div>
          <div>{error.message}라는 문제가 발생하였습니다.</div>
          <p>
            잠시만 기다려주시면 담당자가 호다다닥 해결하겠습니다. <br /> 그때까지 참아주쇼 <br />
            홈으로 돌아가서
          </p>
          <Button color="warning" onClick={() => resetErrorBoundary()}>
            홈으로 이동
          </Button>
        </St.Wrapper>
      </St.ErrorUi>
    );
  }
  if (error.statusCode) {
    return (
      <St.ErrorUi>
        <St.Wrapper>
          <div>서버와 연결중...</div>
          <div>{error.message}라는 문제가 발생하였습니다.</div>
          <p>
            코드 상태가 422인데.. 혹시 아무것도 안하고 버튼누른것은 아닐까요?
            <br /> 암튼 홈으로가서 조용히 자기 반성하죠
          </p>
          <Button color="warning" onClick={() => resetErrorBoundary()}>
            홈으로 이동
          </Button>
        </St.Wrapper>
      </St.ErrorUi>
    );
  }
  return (
    <St.ErrorUi role="alert">
      <St.Wrapper>
        <div>컴포넌트 내부에서 발생한 </div>
        <div>{error.message} 로인해 </div>
        <p>문제가 발생하였습니다.</p>
        <Button color="warning" onClick={() => resetErrorBoundary()}>
          홈으로 이동
        </Button>
      </St.Wrapper>
    </St.ErrorUi>
  );
};

export const logError = async (error: Error, info: ErrorInfo) => {
  // info(객체) 에 {componentStack}이 있는데 에러가 발생한 컴포넌트의 stack을 나타냅니다. componentStack의 타입은 string
  // console.log(info);
  // console.log(error);

  await postSlackApiWithError(error, info);
};

// resetErrorBoundary라는 property는 결국 onReset이라는 ErrorBoundary의 속성값과 일치합니다.
// const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
//   //const { resetBoundary, showBoundary } = useErrorBoundary(); // 비동기 error를 잡을 때 catch 부분에서 사용합니다.
//   // resetErrorBoundary('???????') - onReset의 인자 값으로 error 안에'???????'이 들어있습니다.
//   console.log(error);
//   return (
//     <div role="alert" style={{ display: 'grid', minHeight: '100vh', minWidth: '100vw', placeContent: 'center' }}>
//       <Div>
//         <p>Something went wrong:</p>
//         <pre style={{ color: 'red' }}>{error.message}</pre>
//         <button onClick={() => resetErrorBoundary(error)}>재시도</button>
//       </Div>
//     </div>
//   );
// };

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   font-size: 2.4rem;
// `;
