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

type ParamForRegist = {
  title: string;
  content: string;
  price: string;
  tags: string[];
  userId: string;
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
      tags,
      userId,
      imgFiles,
    };
    await insertProduct(product);
    console.log(product);
    console.log(imgFiles);
  };

  const insertProduct = async (info: ParamForRegist) => {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          title: info.title,
          content: info.content,
          price: info.price,
          userId: info.userId,
        },
      ])
      .select();

    const post_id = data?.[0].id!;
    await postImagesFromStorage(post_id, info.imgFiles);

    if (error) {
      throw console.log(error);
    }
  };

  const postImagesFromStorage = async (id: number, files: File[]) => {
    if (files) {
      const { data, error } = await supabase.storage.from('product-images').upload('asdf/as/asdfasdf/asdf', file);
      console.log(data, error);
    }
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
