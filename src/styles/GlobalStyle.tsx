import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
}
html {
      
      font-size: 62.5%; // 1rem = 10px
}
html,body, #root{
      min-height: 100vh;
}
* {
      font-family: 'Pretendard-Regular';
      margin: 0;
      padding: 0;
      box-sizing: border-box;
}

img {
      width: 100%;
      vertical-align:top;
}
a,button{
      all: unset;
}

`;

export default GlobalStyle;
