import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { ErrorFallBack, logError } from './ErrorFallBack';

// component를 받는 것 보단 보다 선언적으로 propsChildren으로 받는 것으로 명칭과 코드를 바꾸는 것이 리패토링의 방식
const ErrorBoundProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      onReset={(error: any) => {
        // any로 타입지정해야 args를 가져올 수 있는데.. unknown 안되넹;;
        //feedback... 필요하다..

        //error 콘솔로 찍어보면 { reason: "imperative-api"; args: any[];} 이렇게 나오는데 reason은 api 에러니까 저렇게 나오고 args에는 resetErrorBoundary(인자)인자값이 들어있습니다.
        if (error.args[0] === '/auth/login') {
          navigate(error.args[0]);
        } else {
          navigate('/');
        }
      }}
      onError={logError}
      FallbackComponent={ErrorFallBack}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundProvider;
