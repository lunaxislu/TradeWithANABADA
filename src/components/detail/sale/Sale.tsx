import { useEffect, useState } from 'react';
import { getUserSession } from '../../../API/supabase.api';
import * as St from './Sale.styled';
import ImgCard from './imgComponent/ImgCard';
import ProductInfo from './productInfo/ProductInfo';

// ProductInfo Component에서 사용도 합니다.
export type ProductInfoType = {
  content: string;
  created_at: string;
  hash_tags: string[];
  like_count: number;
  price: string;
  product_id: number;
  product_img: string[];
  title: string;
  user_id: string;
};
type PropsType = {
  productInfo: ProductInfoType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
};
const Sale = ({ productInfo, setIsEdit, isEdit }: PropsType) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserSession()
      .then((data) => {
        setUserData(data.session?.user!);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <St.Container>
      <div className="product-info">
        <ImgCard imgUrl={productInfo.product_img} />
        <ProductInfo userData={userData} productInfo={productInfo} />
      </div>

      <div>asdf</div>

      {/* {state.userid === userId && <St.EditButton>{isEdit ? '수정완료' : '수정하기'}</St.EditButton>}; */}
    </St.Container>
  );
};

export default Sale;
