import { useNavigate } from 'react-router-dom';
import { deleteImageFromStorage, deleteProduct } from '../../../../../../API/supabase.api';
import { CommonProductInfoType } from '../../Form';
import * as St from './DeleteButton.styled';
const DeleteButton = ({ productInfo }: { productInfo: CommonProductInfoType }) => {
  const navigate = useNavigate();
  const deleteGoods = async () => {
    await deleteImageFromStorage(productInfo);
    await deleteProduct(productInfo);
    navigate('/');
  };
  return (
    <St.Container>
      <St.Delete type="button" onClick={deleteGoods}>
        삭제하기
      </St.Delete>
    </St.Container>
  );
};

export default DeleteButton;
