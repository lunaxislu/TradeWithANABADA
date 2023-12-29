import Button from '../Button/Button';
import { ProductInfoType } from '../Sale';
import * as St from './ProductInfo.styled';
type PropsType = {
  userData: {
    [key: string]: string | boolean;
  };
  productInfo: ProductInfoType;
};
const ProductInfo = ({ userData, productInfo }: PropsType) => {
  return (
    <St.Container>
      asd
      <Button />
    </St.Container>
  );
};

export default ProductInfo;
