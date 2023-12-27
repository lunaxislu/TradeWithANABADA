import { useState } from 'react';
import * as St from './ProductInfo.styled';
const ProductInfo = () => {
  const [inputState, setInputState] = useState({
    product_name: '',
    product_value: '',
  });
  return (
    <St.Container>
      <St.InputWrapper>
        <input type="text" name="product_name" placeholder="품명을 입력해주세요" required />
        <St.Span />
      </St.InputWrapper>
      <St.InputWrapper>
        <input type="text" name="product_value" placeholder="가치를 말해주세요" required />
        <St.Span />
      </St.InputWrapper>
    </St.Container>
  );
};

export default ProductInfo;
