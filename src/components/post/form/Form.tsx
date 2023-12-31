import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserSession, insertProduct } from '../../../API/supabase.api';
import * as St from './Form.styled';
import ImageForm from './imageForm/SmImgCard';
import InputForm from './inputForm/InputForm';

/**
 * 코드 리팩토링 필요
 */
type PropsType = {
  imgFiles: File[];
};

const Form = () => {
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const registProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: e.currentTarget['product_name'].value,
      content: e.currentTarget['product_text'].value,
      price: e.currentTarget['product_value'].value,
      tags,
      user_id: userId,
      imgFiles,
      category2_id: parseInt(e.currentTarget['category_2'].value),
    };
    const result = await insertProduct(product);

    // navigate(`/detail/:${result[0].id}`);
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
      <St.Wrapper>
        <ImageForm imgFiles={imgFiles} setImgFiles={setImgFiles} />
        <St.Form onSubmit={registProduct}>
          <InputForm tags={tags} setTags={setTags} />
        </St.Form>
      </St.Wrapper>
    </St.Container>
  );
};

export default Form;
