import { displayCreateAt } from '../../../utils/date';
import * as St from './productCard.styled';

type ProductCardInfoProps = {
  createAt: string;
  price: string;
  title: string;
};

const ProductCardInfo = ({ createAt, price, title }: ProductCardInfoProps) => {
  const formatDate = displayCreateAt(createAt);
  return (
    <St.CardInfo>
      <h1>{title}</h1>
      <div>
        <span>{price}원의 가치</span>
        <span>{formatDate}</span>
      </div>
    </St.CardInfo>
  );
};

export default ProductCardInfo;
