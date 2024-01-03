import { useState } from 'react';
import { CommonProductInfoType } from '../../Form';
import * as St from './InfoInput.styled';

const InfoInput = ({ productInfo }: { productInfo: CommonProductInfoType | undefined }) => {
  const [title, setTitle] = useState(productInfo ? productInfo.title : '');
  const [price, setPrice] = useState(productInfo ? productInfo.price : '');

  return (
    <St.Container>
      <St.InputWrapper>
        <input
          id="pr_name"
          type="text"
          name="product_name"
          required
          placeholder="상품명을 입력해주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <label htmlFor="pr_name">상품명</label>
        <St.Span />
      </St.InputWrapper>
      <St.InputWrapper>
        <input
          id="pr_value"
          type="text"
          name="product_value"
          placeholder="가치를 입력해주세요"
          required
          value={price}
          onChange={(e) => {
            setPrice(e.currentTarget.value);
          }}
        />
        <label htmlFor="pr_value">가치</label>
        <St.Span />
      </St.InputWrapper>
    </St.Container>
  );
};

export default InfoInput;
