import { FormEvent } from 'react';
import * as St from './PostForm.styled';
import FormButton from './formButton/FormButton';
import HashTag from './hashTag/HashTag';
import ProductInfo from './productInfo/ProductInfo';
const PostForm = () => {
  const preventDefaultEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <St.Container>
      <St.Form onSubmit={preventDefaultEvent}>
        <ProductInfo />
        <HashTag />
        <FormButton />
      </St.Form>
    </St.Container>
  );
};

export default PostForm;
