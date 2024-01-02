import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps, useErrorBoundary } from 'react-error-boundary';
import styled, { ThemeProvider } from 'styled-components';
import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary
          onReset={(error) => {
            console.log('onReset', error);
          }}
          onError={logError}
          FallbackComponent={ErrorFallback}
        >
          <Router />
        </ErrorBoundary>
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
const logError = async (error: Error, info: ErrorInfo) => {
  console.log(info); // info(객체) 에 {componentStack}이 있는데 에러가 발생한 컴포넌트의 stack을 나타냅니다. componentStack의 타입은 string
  console.log(error);
  // await postSlackApiWithError(error, info);
};

// Error boundary 컴포넌트의 FallbackComponent
// resetErrorBoundary라는 property는 결국 onReset이라는 ErrorBoundary의 속성값과 일치합니다.
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { resetBoundary, showBoundary } = useErrorBoundary(); // 비동기 error를 잡을 때 catch 부분에서 사용합니다.
  // resetErrorBoundary('???????') - onReset의 인자 값으로 error 안에'???????'이 들어있습니다.
  console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;');
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
