import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { ErrorFallBack, logError } from './ErrorFallBack';

const useWithErrorBound = (component: React.ReactNode) => {
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
      {component}
    </ErrorBoundary>
  );
};

export default useWithErrorBound;
