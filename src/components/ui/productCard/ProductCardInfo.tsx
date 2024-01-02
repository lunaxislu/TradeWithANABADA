import { displayCreateAt } from '../../../utils/date';
import * as St from './productCard.styled';

type ProductCardInfoProps = {
  createAt: string;
  price: string;
  title: string;
  content: string;
};

const ProductCardInfo = ({ createAt, price, title, content }: ProductCardInfoProps) => {
  const formatDate = displayCreateAt(createAt);
  return (
    <St.CardInfo>
      <h1>{title}</h1>
      <span>{content}</span>
      <div>
        <div>
          <span>{price}</span>
          <span>원의 가치</span>
        </div>
        <span>{formatDate}</span>
      </div>
    </St.CardInfo>
  );
};

export default ProductCardInfo;
