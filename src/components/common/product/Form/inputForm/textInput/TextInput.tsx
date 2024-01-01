import { useState } from 'react';
import { CommonProductInfoType } from '../../Form';
import * as St from './TextInput.styled';

const TextInput = ({ productInfo }: { productInfo: CommonProductInfoType | undefined }) => {
  const [text, setText] = useState(productInfo ? productInfo.content : '');
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

export default TextInput;
