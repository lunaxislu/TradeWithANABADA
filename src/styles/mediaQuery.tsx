import { css } from 'styled-components';
import { CSSProp, Styles } from 'styled-components/dist/types';

const breakPoints = {
  sm: 768,
  md: 996,
  lg: 1200,
};

let init: { [key: string]: (param: Styles<object>) => CSSProp } = {};

const mediaQuery = Object.entries(breakPoints).reduce((acc, [key, value]) => {
  acc[key] = (...arg) => css`
    @media (min-width: ${value}px) {
      ${css(...arg)}
    }
  `;
  return acc;
}, init);

export default mediaQuery;
