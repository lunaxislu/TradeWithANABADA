import * as St from './TextInput.styled';

const TextInput = () => {
  return (
    <St.Container>
      <textarea name="product_text" placeholder="최대 500자입니다." maxLength={500} required />
    </St.Container>
  );
};

export default TextInput;
