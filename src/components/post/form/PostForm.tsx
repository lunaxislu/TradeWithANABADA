import { FormEvent, useEffect, useState } from 'react';
import { getUserSession } from '../../../API/supabase.api';
import * as St from './PostForm.styled';
import FormButton from './formButton/FormButton';
import HashTag from './hashTag/HashTag';
import ProductInfo from './productInfo/ProductInfo';
import ProductText from './productText/ProductText';

type PropsType = {
  imgFiles: File[];
};

const PostForm = ({ imgFiles }: PropsType) => {
  const [tags, setTags] = useState<string[]>([]);
  const [userId, setUserId] = useState('');

  const registProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: e.currentTarget['product_name'].value,
      content: e.currentTarget['product_value'].value,
      createdAt: Date.now(),
      tags,
      userId,
    };
    console.log(imgFiles);
  };

  useEffect(() => {
    getUserSession().then((userSession) => {
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
