import { UserMetadata } from '@supabase/supabase-js';
import React from 'react';
import { CommonProductInfoType } from '../Form';
import * as St from './ButtonForm.styled';
import DeleteButton from './deletButton/DeleteButton';
import EditButton from './editButton/EditButton';
import LikeAndTalk from './likeAndTalkButton/LikeAndTalk';
import RegistButton from './registButton/RegistButton';
export type PropsOfLikeAndTalk = {
  post_id?: number;
  user_id?: string;
};
export type CommonPropsOfButtonType = {
  userData?: UserMetadata;
  productInfo?: CommonProductInfoType;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonForm = ({ userData, productInfo, isEdit, setIsEdit }: CommonPropsOfButtonType) => {
  if (isEdit === undefined || !productInfo) return <RegistButton />;

  if (isEdit === false && productInfo)
    return (
      <St.EditFalse>
        <LikeAndTalk post_id={productInfo?.product_id} user_id={userData?.user_id} />
        <EditButton userData={userData} productInfo={productInfo} isEdit={isEdit} setIsEdit={setIsEdit} />
      </St.EditFalse>
    );

  if (isEdit && productInfo)
    return (
      <St.EditTrue>
        <EditButton userData={userData} productInfo={productInfo} isEdit={isEdit} setIsEdit={setIsEdit} />
        <DeleteButton productInfo={productInfo} />
      </St.EditTrue>
    );
  return <></>;
};

export default ButtonForm;
