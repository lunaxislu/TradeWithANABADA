import { useNavigate } from 'react-router-dom';
import { ReactComponent as Heart } from '../../../styles/assets/heart.svg';
import { ProductData } from '../../home/HomeProductList';
import ProductCardInfo from './ProductCardInfo';
import * as St from './productCard.styled';

type ProductCardProps = {
  productInfo: ProductData;
};

const ProductCard = ({ productInfo }: ProductCardProps) => {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/detail/${productInfo.product_id}`, { state: productInfo });
  };

  return (
    <St.CardContainer onClick={goToProductDetail}>
      <St.CardImage>
        {/* TODO: Product 정보의 썸네일 가져오기 */}
        <img src={productInfo.product_img?.[0]} alt="" />
        {/* <img src={process.env.PUBLIC_URL + '/profile.jpeg'} /> */}

        <St.HeartSection>
          <Heart />
          <span>{productInfo.like_count}</span>
        </St.HeartSection>
      </St.CardImage>

      <ProductCardInfo
        createAt={productInfo.created_at}
        price={productInfo.price}
        title={productInfo.title}
        content={productInfo.content}
      />
    </St.CardContainer>
  );
};

export default ProductCard;
