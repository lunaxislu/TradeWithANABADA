import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
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
