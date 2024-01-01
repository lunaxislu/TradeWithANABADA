import * as St from '../Profile.styled';
import { ProductStatus } from '../ProfileProductList';

type Props = {
  label: string;
  state: ProductStatus;
  currentList: ProductStatus;
  onClick: (state: ProductStatus) => void;
};

const ListButton = ({ label, state, currentList, onClick }: Props) => {
  return (
    <St.ListBtn className={currentList === state ? 'active' : ''} onClick={() => onClick(state)}>
      {label}
    </St.ListBtn>
  );
};

export default ListButton;
