import * as St from './PostForm.styled';
const PostForm = () => {
  return (
    <St.Container>
      <St.Form action="">
        <St.ProductInfo>
          <input type="text" name="product_name" placeholder="품명을 입력해주세요" />
          <input type="text" name="product_value" placeholder="원화로 가치를 환산해주세요" />
        </St.ProductInfo>

        <St.UesrInfo></St.UesrInfo>
        <St.ButtonContainer></St.ButtonContainer>
      </St.Form>
    </St.Container>
  );
};

export default PostForm;
