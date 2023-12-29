import { UserMetadata } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserPoint } from '../../../../API/supabase.api';
import { displayCreateAt } from '../../../../utils/date';
import { ProductInfoType } from '../Sale';
import * as St from './ProductInfo.styled';
type PropsType = {
  userData: UserMetadata;
  productInfo: ProductInfoType;
};

type UserStateType = {
  nickname: string | null;
  point: number | null;
};
const ProductInfo = ({ userData, productInfo }: PropsType) => {
  console.log(userData);
  console.log(productInfo);
  const [userState, setUserState] = useState<null | UserStateType>(null);

  useEffect(() => {
    getUserPoint(productInfo.user_id).then((result) => {
      console.log(result);
      if (result && result[0]) {
        setUserState(result[0]);
      }
    });
    return () => {};
  }, []);

  return (
    <St.Container>
      <St.ProductText>
        <St.CreatedDate>{displayCreateAt(productInfo.created_at)}</St.CreatedDate>
        <div className="text-wrapper">
          <h3 className="product-title">상품명</h3>
          <div>{productInfo.title}</div>
        </div>
        <div className="text-wrapper">
          <h3 className="product-value">상품가치 </h3>
          <div>{productInfo.price}</div>
        </div>
      </St.ProductText>
      <St.User>
        <div className="user-wrapper">
          <div className="user-info">
            <img src={userData.avatar_url} alt="" />
            <div className="user-profile">
              <div className="user-name">{userState?.nickname}</div>
              <div className="user-point">
                {userState?.point ? `${userState.point}입니다.` : '힘내세요 등급올려야 자본주의에서 살아남죠'}
              </div>
            </div>
          </div>
          <Link to={`/profile/${productInfo.user_id}`}>상세페이지로 이동</Link>
        </div>
      </St.User>
      <St.HashTag>
        <h4>희망 교환 품목</h4>
        <div className="tag-wrapper">
          {productInfo.hash_tags.map((tag, idx) => {
            return <span>{tag}</span>;
          })}
        </div>
      </St.HashTag>

      <St.ButtonContainer>
        <button>찜하기</button>
        <button>Talk 보내기</button>
      </St.ButtonContainer>
    </St.Container>
  );
};

export default ProductInfo;
