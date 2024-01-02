import { UserMetadata } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import { getUserInfoInProduct } from '../../../../API/supabase.api';
import { displayCreateAt } from '../../../../utils/date';
import ButtonForm from '../../../common/product/Form/buttonForm/ButtonForm';
import { ProductInfoType } from '../Sale';
import * as St from './ProductInfo.styled';

type PropsType = {
  userData: UserMetadata;
  productInfo: ProductInfoType;
  isEdit: boolean;
};

type UserStateType = {
  nickname: string | null;
  point: number | null;
  avatar_img: string | null;
};
const ProductInfo = ({ userData, productInfo, isEdit }: PropsType) => {
  const [userState, setUserState] = useState<null | UserStateType>(null);
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    getUserInfoInProduct(productInfo.user_id)
      .then((result) => {
        if (result && result[0]) {
          setUserState(result[0]);
        }
      })
      .catch((error) => showBoundary(error));
    return () => {};
  }, []);

  return (
    <St.Container>
      {/* 상품 제목과 상품의 가치를 등록한 유저가 측정내용입니다.  */}
      <St.ProductText>
        <St.CreatedDate>{displayCreateAt(productInfo?.created_at)}</St.CreatedDate>
        <div className="text-wrapper">
          <h3 className="product-title">상품명</h3>
          <div>{productInfo.title}</div>
        </div>
        <div className="text-wrapper">
          <h3 className="product-value">상품가치 </h3>
          <div>{productInfo.price}</div>
        </div>
      </St.ProductText>

      {/* 상품등록한 user의 profile 입니다. */}
      <St.User>
        <div className="user-wrapper">
          <div className="user-info">
            <img src={userState?.avatar_img!} alt="" />

            <div className="user-profile">
              <div className="user-name">{userState?.nickname}</div>
              <div className="user-point">
                {userState?.point ? `${userState.point}입니다.` : '힘내세요 등급올려야 자본주의에서 살아남죠!'}
              </div>
            </div>
          </div>
          <Link to={`/profile/${productInfo.user_id}`}>상세페이지로 이동</Link>
        </div>
      </St.User>

      {/* 교환하고싶은 태그 모음입니다. */}
      <St.HashTag>
        <h4>희망 교환 품목</h4>
        <div className="tag-wrapper">
          {productInfo.hash_tags.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })}
        </div>
      </St.HashTag>

      <ButtonForm userData={userData} productInfo={productInfo} isEdit={isEdit} />
    </St.Container>
  );
};

export default ProductInfo;
