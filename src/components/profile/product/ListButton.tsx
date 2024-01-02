import { ProductData } from '../../home/HomeProductList';
import * as St from '../Profile.styled';
import { ProductStatus } from '../ProfileProductList';

type Props = {
  label: string;
  state: ProductStatus;
  currentList: ProductStatus;
  onClick: (state: ProductStatus) => void;
  wishListData: ProductData[];
  onSaleListData: ProductData[];
  soldOutListData: ProductData[];
};

const ListButton = ({ label, state, currentList, onClick, wishListData, onSaleListData, soldOutListData }: Props) => {
  return (
    <St.ListBtn className={currentList === state ? 'active' : ''} onClick={() => onClick(state)}>
      {label}
      {(() => {
        switch (label) {
          case '찜 목록':
            return <>{` (${wishListData.length})`}</>;
          case '판매 중인 상품':
            return <>{` (${onSaleListData.length})`}</>;
          case '판매 완료 상품':
            return <>{` (${soldOutListData.length})`}</>;
          default:
            break;
        }
      })()}
    </St.ListBtn>
  );
};

export default ListButton;
