import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
