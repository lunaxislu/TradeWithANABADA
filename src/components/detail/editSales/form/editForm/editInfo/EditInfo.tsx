import { useState } from 'react';
import { ProductInfoType } from '../../../../sale/Sale';
import * as St from './EditInfo.styled';
const EditInfo = ({ productInfo }: { productInfo: ProductInfoType }) => {
  const [title, setTitle] = useState(productInfo.title);
  const [price, setPrice] = useState(productInfo.price);
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
        <label htmlFor="pr_name">Name</label>
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
        <label htmlFor="pr_value">Value</label>
        <St.Span />
      </St.InputWrapper>
    </St.Container>
  );
};

export default EditInfo;
