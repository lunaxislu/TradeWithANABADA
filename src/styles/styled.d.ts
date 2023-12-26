import "styled-components";

// DefaultTheme 에 관하여 타입 지정을 해줍니다.
// 여기서 타입 지정 후 theme.ts에서 key, value 작성을 해주시면 됩니다.
declare module "styled-components" {
  export type DefaultTheme = {
    // 샘플입니다.
    defaultColor: string;
  };
}
