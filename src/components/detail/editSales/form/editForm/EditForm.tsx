import React from 'react';
import { ProductInfoType } from '../../../sale/Sale';
import * as St from './EditForm.styled';
import EditCategory from './editCategory/EditCategory';
import EditInfo from './editInfo/EditInfo';
import EditText from './editText/EditText';
import EditHashTag from './hashTag/EditHashTag';
type PropsType = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  productInfo: ProductInfoType;
};

const EditForm = ({ tags, setTags, productInfo }: PropsType) => {
  return (
    <St.Container>
      <EditInfo productInfo={productInfo} />
      <EditHashTag tags={tags} setTags={setTags} />
      <EditCategory />
      <EditText productInfo={productInfo} />
    </St.Container>
  );
};

export default React.memo(EditForm);
