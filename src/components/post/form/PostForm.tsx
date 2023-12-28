import { FormEvent, useEffect, useState } from 'react';
import { getUserSession, supabase } from '../../../API/supabase.api';
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

  const registProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: e.currentTarget['product_name'].value,
      content: e.currentTarget['product_text'].value,
      price: e.currentTarget['product_value'].value,
      createdAt: Date.now(),
      tags,
      userId,
    };
    await insertProduct(e);
    console.log(product);
    console.log(imgFiles);
  };

  const insertProduct = async (e: FormEvent<HTMLFormElement>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          title: e.currentTarget['product_name'].value,
          content: e.currentTarget['product_text'].value,
          price: e.currentTarget['product_value'].value,
          userId,
        },
      ])
      .select();
    console.log(data);
    console.log(error);
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
