import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
html {
      font-size: 62.5%; // 1rem = 10px
}
html,body, #root{
      min-height: 100vh;
}
* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
}

img {
      width: 100%;
      vertical-align:top;
}

`;

export default GlobalStyle;
