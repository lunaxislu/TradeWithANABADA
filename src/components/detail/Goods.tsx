import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import * as St from './Goods.styled';
import EditSale from './editSales/EditSale';
import Sale from './sale/Sale';

const Goods = () => {
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <St.Container>
      <St.Wrapper>
        <St.Category>
          <Link to={`/product?search=${state.category1_name}`}>
            {state.category1_name + ` > ` + state.category2_name}
          </Link>
        </St.Category>
        {isEdit ? (
          <EditSale productInfo={state} setIsEdit={setIsEdit} isEdit={isEdit} />
        ) : (
          <Sale productInfo={state} setIsEdit={setIsEdit} isEdit={isEdit} />
        )}
      </St.Wrapper>
    </St.Container>
  );
};

export default Goods;
