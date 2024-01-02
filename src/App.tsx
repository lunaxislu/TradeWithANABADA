import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps, useErrorBoundary } from 'react-error-boundary';
import styled, { ThemeProvider } from 'styled-components';
import { postSlackApiWithError } from './API/slack.api';
import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary onReset={(error) => console.log(error)} onError={logError} FallbackComponent={ErrorFallback}>
        <ThemeProvider theme={theme}>
          <Router />
          <GlobalStyle />
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
const logError = async (error: Error, info: ErrorInfo) => {
  await postSlackApiWithError(error, info);
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
