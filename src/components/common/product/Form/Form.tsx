import { UserMetadata } from '@supabase/supabase-js';
import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteImageFromStorage,
  deleteProduct,
  getUserSession,
  insertProduct,
  updateTableRow,
} from '../../../../API/supabase.api';
import * as St from './Form.styled';
import ImageForm from './imageForm/ImageForm';
import InputForm from './inputForm/InputForm';
type PropsOfEditProductType = {
  productInfo?: CommonProductInfoType | undefined;
  isEdit?: boolean | undefined;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};
export type CommonProductInfoType = {
  content: string;
  created_at: string;
  hash_tags: string[];
  like_count: number;
  price: string;
  product_id: number;
  product_img: string[];
  title: string;
  user_id: string;
  category2_id: number;
};
const Form = ({ productInfo, isEdit, setIsEdit }: PropsOfEditProductType) => {
  const [tags, setTags] = useState<string[]>(productInfo ? productInfo.hash_tags : []);
  const [userData, setUserData] = useState<UserMetadata>({});
  const [imgFiles, setImgFiles] = useState<(Blob | File)[]>([]);
  const navigate = useNavigate();
  const editProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: e.currentTarget['product_name'].value,
      content: e.currentTarget['product_text'].value,
      price: e.currentTarget['product_value'].value,
      tags,
      user_id: userData.id,
      imgFiles,
      category2_id: parseInt(e.currentTarget['category_2'].value),
    };

    const result = await insertProduct(product);
    if (productInfo) {
      await updateTableRow(productInfo, result);
      await deleteImageFromStorage(productInfo);
      await deleteProduct(productInfo);
      if (setIsEdit) {
        setIsEdit(false);
      }
    }

    navigate(`/`);
  };

  //   const deleteGoods = async () => {
  //     await deleteImageFromStorage(productInfo);
  //     await deleteProduct(productInfo);
  //     navigate('/');
  //   };
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
        {/* <EditImg imgFiles={imgFiles} setImgFiles={setImgFiles} productInfo={productInfo} /> */}
        <ImageForm imgFiles={imgFiles} setImgFiles={setImgFiles} productInfo={productInfo} />
        <St.Form onSubmit={editProduct}>
          <InputForm tags={tags} setTags={setTags} productInfo={productInfo} />
          {/* <EditForm tags={tags} setTags={setTags} productInfo={productInfo} /> */}

          <St.ButtonGroup>
            {/* <button className="delete-button" type="button" onClick={deleteGoods}>
              삭제하기
            </button> */}
            <button className="edit-button">수정완료</button>
          </St.ButtonGroup>
        </St.Form>
      </St.Wrapper>
    </St.Container>
  );
};

export default Form;
