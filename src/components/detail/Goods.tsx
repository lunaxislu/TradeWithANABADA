import { useState } from 'react';
import { useLocation } from 'react-router';
import * as St from './Goods.styled';
import EditSale from './editSales/EditSale';
import Sale from './sale/Sale';

const Goods = () => {
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <St.Container>
      {isEdit ? (
        <EditSale productInfo={state} setIsEdit={setIsEdit} isEdit={isEdit} />
      ) : (
        <Sale productInfo={state} setIsEdit={setIsEdit} isEdit={isEdit} />
      )}
    </St.Container>
  );
};

export default Goods;
