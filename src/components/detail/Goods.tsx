import { useState } from 'react';
import { useLocation } from 'react-router';
import * as St from './Goods.styled';
import EditSale from './editComponent/EditSale';
import Sale from './sale/Sale';

const Goods = () => {
  const { state } = useLocation();
  const [editGoods, setEditGoods] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  return (
    <St.Container>
      {isEdit ? (
        <EditSale setEditGoods={setEditGoods} />
      ) : (
        <Sale productInfo={state} setIsEdit={setIsEdit} isEdit={isEdit} />
      )}
    </St.Container>
  );
};

export default Goods;
