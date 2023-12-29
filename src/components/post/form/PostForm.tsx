import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserSession, insertProduct } from '../../../API/supabase.api';
import * as St from './PostForm.styled';
import FormButton from './formButton/FormButton';
import HashTag from './hashTag/HashTag';
import ProductInfo from './productInfo/ProductInfo';
import ProductText from './productText/ProductText';

/**
 * 코드 리팩토링 필요
 */
type PropsType = {
  imgFiles: File[];
};

const PostForm = ({ imgFiles }: PropsType) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [userId, setUserId] = useState('');
  const registProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: e.currentTarget['product_name'].value,
      content: e.currentTarget['product_text'].value,
      price: e.currentTarget['product_value'].value,
      tags,
      userId,
      imgFiles,
    };
    const result = await insertProduct(product);

    navigate(`/detail/:${result[0].id}`);
  };

  // 사용자의 고유 아이디 uid를 가져옵니다.
  useEffect(() => {
    getUserSession().then(async (userSession) => {
      if (userSession.session) {
        setUserId(userSession.session.user.id);
      }
    });
  }, []);
  return (
    <St.Container>
      <St.Form onSubmit={registProduct}>
        <ProductInfo />
        <HashTag tags={tags} setTags={setTags} />
        <ProductText />
        <FormButton />
      </St.Form>
    </St.Container>
  );
};

export default PostForm;
