import { nanoid } from 'nanoid';
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
  };

  const insertProduct = async (info: ParamForRegist) => {
    // post Table에 우선 text들을 저장 합니다.
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
    // post_id && createdAt를 가져와서 storage의 고유 경로로 사용합니다.
    const post_id = data?.[0].id!;
    const date = data?.[0].createdAt!;
    await postImagesFromStorage(post_id, info.imgFiles, date);

    if (error) {
      throw console.log(error);
    }
  };

  const postImagesFromStorage = async (id: number, files: File[], date: string) => {
    // 이미지가 Array 형태로 담겨져 있으므로 promise All을 사용하려고 변수에 담았습니다.
    const uploadImage = files.map(async (file) => {
      // nano id를 사용해서 이미지 고유 이름으로 넣습니다.
      const imageName = nanoid();
      const { data } = await supabase.storage
        .from('product-images')
        .upload(`${userId}/${id}/${date}/${imageName}`, file);
      return data;
    });

    // Promise.all로 처리하여 urlPath라는 변수에 담습니다.
    const urlPath = await Promise.all(uploadImage);

    // getPublicUrl이라는 메소드가 동기 함수입니다;; 당황함 그래서 그냥 async await을 사용하지 않았습니다.
    const urls = urlPath.map((url) => {
      const { data } = supabase.storage.from('product-images').getPublicUrl(`${url?.path}`);
      return data.publicUrl;
    });

    // product에다가 다시 넣어줬습니다.
    const { data, error } = await supabase
      .from('products')
      .update({
        productImg: urls,
      })
      .eq('id', id) // product_id를 찾는 eq입니다.
      .select();
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
