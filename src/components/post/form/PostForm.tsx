import * as St from './PostForm.styled';
import FormButton from './formButton/FormButton';
import HashTag from './hashTag/HashTag';
import ProductInfo from './productInfo/ProductInfo';
const PostForm = () => {
  return (
    <St.Container>
      <St.Form>
        <ProductInfo />
        <HashTag />
        <FormButton />
      </St.Form>
    </St.Container>
  );
};

export default PostForm;
