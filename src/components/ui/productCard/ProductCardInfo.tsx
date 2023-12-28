import * as St from './productCard.styled';

type ProductCardInfoProps = {
  createAt: string;
  price: string;
  title: string;
};

const ProductCardInfo = ({ createAt, price, title }: ProductCardInfoProps) => {
  return (
    <St.CardInfo>
      <h1>{title}</h1>
      <div>
        <span>{price}</span>
        <span>{createAt}</span>
      </div>
    </St.CardInfo>
  );
};

export default ProductCardInfo;
