import * as St from './EditSale.styled';

type PropsType = {
  setEditGoods: React.Dispatch<React.SetStateAction<object>>;
};
const EditSale = ({ setEditGoods }: PropsType) => {
  return <St.Container>수정하는 공간</St.Container>;
};

export default EditSale;
