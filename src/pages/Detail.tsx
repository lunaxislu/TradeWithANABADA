import { ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps, useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Goods from '../components/detail/Goods';

const Detail = () => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary onReset={(error) => console.log(error)} onError={logError} FallbackComponent={ErrorFallback}>
      <Goods />
    </ErrorBoundary>
  );
};

export default Detail;

// Error boundary 컴포넌트의 onError 타입을 보면 error 발생시 doSomething 해주면 됩니다.
const logError = async (error: Error, info: ErrorInfo) => {
  // await postSlackApiWithError(error, info);
};

// Error boundary 컴포넌트의 FallbackComponent
// resetErrorBoundary라는 property는 결국 onReset이라는 ErrorBoundary의 속성값과 일치합니다.
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { resetBoundary, showBoundary } = useErrorBoundary();
  console.log(error);

  return (
    <div role="alert" style={{ display: 'grid', minHeight: '100vh', minWidth: '100vw', placeContent: 'center' }}>
      <Div>
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        <button onClick={() => resetErrorBoundary(error)}>재시도</button>
      </Div>
    </div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 2.4rem;
`;
