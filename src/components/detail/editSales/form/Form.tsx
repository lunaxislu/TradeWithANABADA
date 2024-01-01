import { FormEvent, useEffect, useState } from 'react';
import {
  deleteImageFromStorage,
  deleteProduct,
  getUserSession,
  insertProduct,
  updateTableRow,
} from '../../../../API/supabase.api';

import { UserMetadata } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { EditSalePropsType } from '../EditSale';
import * as St from './Form.styled';
// import EditForm from './editForm/EditForm';
import ImageForm from '../../../common/product/imageForm/ImageForm';
import InputForm from '../../../common/product/inputform/InputForm';
// import EditImg from './editImg/EditImg';

const Form = ({ productInfo, isEdit, setIsEdit }: EditSalePropsType) => {
  const [tags, setTags] = useState<string[]>(productInfo.hash_tags);
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
    await updateTableRow(productInfo, result);
    await deleteImageFromStorage(productInfo);
    await deleteProduct(productInfo);
    navigate(`/`);
    setIsEdit(false);
  };

  const deleteGoods = async () => {
    await deleteImageFromStorage(productInfo);
    await deleteProduct(productInfo);
    navigate('/');
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
        {/* <EditImg imgFiles={imgFiles} setImgFiles={setImgFiles} productInfo={productInfo} /> */}
        <ImageForm imgFiles={imgFiles} setImgFiles={setImgFiles} productInfo={productInfo} />
        <St.Form onSubmit={editProduct}>
          <InputForm tags={tags} setTags={setTags} productInfo={productInfo} />
          {/* <EditForm tags={tags} setTags={setTags} productInfo={productInfo} /> */}

          <St.ButtonGroup>
            <button className="delete-button" type="button" onClick={deleteGoods}>
              삭제하기
            </button>
            <button className="edit-button">수정완료</button>
          </St.ButtonGroup>
        </St.Form>
      </St.Wrapper>
    </St.Container>
  );
};

export default Form;
