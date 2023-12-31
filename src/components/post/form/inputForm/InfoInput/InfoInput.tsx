import * as St from './InfoInput.styled';
const InfoInput = () => {
  return (
    <St.Container>
      <St.InputWrapper>
        <input id="pr_name" type="text" name="product_name" required placeholder="상품명을 입력해주세요" />
        <label htmlFor="pr_name">Name</label>
        <St.Span />
      </St.InputWrapper>
      <St.InputWrapper>
        <input id="pr_value" type="text" name="product_value" placeholder="가치를 입력해주세요" required />
        <label htmlFor="pr_value">Value</label>
        <St.Span />
      </St.InputWrapper>
    </St.Container>
  );
};

export default InfoInput;
