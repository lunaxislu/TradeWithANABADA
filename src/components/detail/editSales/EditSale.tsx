import { useState } from 'react';
import { ProductInfoType } from '../sale/Sale';
import * as St from './EditSale.styled';
import EditImg from './editImg/EditImg';
import EditForm from './form/EditForm';
const EditSale = ({ productInfo }: { productInfo: ProductInfoType }) => {
  console.log(productInfo);
  /**
   * useState any타입 바꿔야지...
   */
  const [imgFiles, setImgFiles] = useState<any>([]);
  return (
    <St.Container>
      <St.Wrapper>
        <EditImg imgFiles={imgFiles} setImgFiles={setImgFiles} productInfo={productInfo} />
        <EditForm />
      </St.Wrapper>
    </St.Container>
  );
};

export default EditSale;
