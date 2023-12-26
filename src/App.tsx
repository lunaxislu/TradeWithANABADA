import { ThemeProvider } from 'styled-components';
import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

export default App;
