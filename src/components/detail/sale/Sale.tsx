import { UserMetadata } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { getUserSession } from '../../../API/supabase.api';
import ButtonForm from '../../common/product/Form/buttonForm/ButtonForm';
import * as St from './Sale.styled';
import ImgCard from './imgComponent/ImgCard';
import ProductInfo from './product/ProductInfo';

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
  category2_id: number;
  status: boolean;
};
type PropsType = {
  productInfo: ProductInfoType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
};
const Sale = ({ productInfo, setIsEdit, isEdit }: PropsType) => {
  const [userData, setUserData] = useState<UserMetadata>({});
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    getUserSession()
      .then((data) => {
        if (data) {
          setUserData(data.session?.user!);
        }
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, []);
  /**
   * userData는 지금 브라우저의 로그인한 user의 아이디
   * productInfo.user_id는 상품등록한 user의 아이디 입니다.
   */
  return (
    //$status 의 상태에 따라서 판매완료 ui를 보여줍니다.
    <St.Container $status={productInfo.status}>
      <div className="product-info">
        <ImgCard imgUrl={productInfo.product_img} />
        <ProductInfo userData={userData} productInfo={productInfo} isEdit={isEdit} />
      </div>

      <St.TextContainer className="product-text">
        <h2 className="title">상품 설명</h2>
        <St.TextWrapper>
          {productInfo.content}
          <ButtonForm userData={userData} productInfo={productInfo} isEdit={isEdit} setIsEdit={setIsEdit} />
        </St.TextWrapper>
      </St.TextContainer>
    </St.Container>
  );
};

export default Sale;
