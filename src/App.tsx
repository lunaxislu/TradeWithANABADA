import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import withErrorBound from './error-boundary/withErrorBound';
import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {withErrorBound(<Router />)}
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
