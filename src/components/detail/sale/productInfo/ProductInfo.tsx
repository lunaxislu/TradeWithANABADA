import { UserMetadata } from '@supabase/supabase-js';
import { displayCreateAt } from '../../../../utils/date';
import Button from '../Button/Button';
import { ProductInfoType } from '../Sale';
import * as St from './ProductInfo.styled';
type PropsType = {
  userData: UserMetadata;
  productInfo: ProductInfoType;
};

const ProductInfo = ({ userData, productInfo }: PropsType) => {
  console.log(productInfo);
  console.log(userData);

  return (
    <St.Container>
      <St.ProductText>
        <St.CreatedDate>{displayCreateAt(productInfo.createdat)}</St.CreatedDate>
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
          <img src={userData.avatar_url} alt="" />
          <div className="user-info">
            <span></span>
          </div>
        </div>
      </St.User>
      <Button />
    </St.Container>
  );
};

export default ProductInfo;
