import { FormEvent, useEffect, useState } from 'react';
import { getUserSession, insertProduct } from '../../../../API/supabase.api';

import { UserMetadata } from '@supabase/supabase-js';
import EditButton from '../../ButtonGroup/EditButton/EditButton';
import { EditSalePropsType } from '../EditSale';
import * as St from './Form.styled';
import EditForm from './editForm/EditForm';
import EditImg from './editImg/EditImg';

const Form = ({ productInfo, isEdit, setIsEdit }: EditSalePropsType) => {
  const [tags, setTags] = useState<string[]>(productInfo.hash_tags);
  const [userData, setUserData] = useState<UserMetadata>({});
  const [imgFiles, setImgFiles] = useState<(Blob | File)[]>([]);
  const registProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: e.currentTarget['product_name'].value,
      content: e.currentTarget['product_text'].value,
      price: e.currentTarget['product_value'].value,
      tags,
      user_id: userData.user,
      imgFiles,
    };
    e.currentTarget['product_name'].value = '';
    e.currentTarget['product_text'].value = '';
    e.currentTarget['product_value'].value = '';
    const result = await insertProduct(product);
  };

  // 사용자의 고유 아이디 uid를 가져옵니다.
  useEffect(() => {
    getUserSession().then(async (userSession) => {
      if (userSession.session) {
        setUserData(userSession.session.user);
      }
    });
  }, []);
  return (
    <St.Container>
      <St.Wrapper>
        <EditImg imgFiles={imgFiles} setImgFiles={setImgFiles} productInfo={productInfo} />

        <St.Form onSubmit={registProduct}>
          <EditForm tags={tags} setTags={setTags} productInfo={productInfo} />
          <EditButton isEdit={isEdit} setIsEdit={setIsEdit} userData={userData} productInfo={productInfo} />
        </St.Form>
      </St.Wrapper>
    </St.Container>
  );
};

export default Form;
