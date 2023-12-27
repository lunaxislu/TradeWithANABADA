import * as St from './PostForm.styled';
import FormButton from './formButton/FormButton';
import ProductInfo from './productInfo/ProductInfo';
import UserInfo from './userInfo/UserInfo';
const PostForm = () => {
  return (
    <St.Container>
      <St.Form>
        <ProductInfo />
        <UserInfo />
        <FormButton />
      </St.Form>
    </St.Container>
  );
};

export default PostForm;
