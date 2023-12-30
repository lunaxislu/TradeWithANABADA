import { useState } from 'react';
import { ProductInfoType } from '../../../../sale/Sale';
import * as St from './EditText.styled';
const EditText = ({ productInfo }: { productInfo: ProductInfoType }) => {
  const [text, setText] = useState(productInfo.content);
  return (
    <St.Container>
      <textarea
        name="product_text"
        placeholder="최대 500자입니다."
        maxLength={500}
        required
        value={text}
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
      />
    </St.Container>
  );
};

export default EditText;
