import 'styled-components';

// DefaultTheme 에 관하여 타입 지정을 해줍니다.
// 여기서 타입 지정 후 theme.ts에서 key, value 작성을 해주시면 됩니다.
declare module 'styled-components' {
  // DefaultTheme을 overriding하기 위해서 type 대신 interface 했습니다.
  interface DefaultTheme {
    // 샘플입니다.
    defaultColor: string;
    mediaQuery: {
      [key: string]: (arg: Styles<object>) => CSSProp;
    };
  }
}
