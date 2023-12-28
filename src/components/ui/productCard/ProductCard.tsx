import { ReactComponent as Heart } from '../../../styles/assets/heart.svg';
import { ProductData } from '../../home/HomeProductList';
import ProductCardInfo from './ProductCardInfo';
import * as St from './productCard.styled';

type ProductCardProps = {
  productInfo: ProductData;
};

const ProductCard = ({ productInfo }: ProductCardProps) => {
  return (
    <St.CardContainer>
      <St.CardImage>
        {/* TODO: Product 정보의 썸네일 가져오기 */}
        {/* <img src={productInfo.productimg[0]} /> */}
        <img src={process.env.PUBLIC_URL + '/profile.jpeg'} />

        <St.HeartSection>
          <Heart />
          <span>{productInfo.like_count}</span>
        </St.HeartSection>
      </St.CardImage>

      <ProductCardInfo createAt={productInfo.createdat} price={productInfo.price} title={productInfo.title} />
    </St.CardContainer>
  );
};

export default ProductCard;
