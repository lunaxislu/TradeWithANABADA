import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/profileHook/useProfile';
import { useData } from '../../hooks/queryHook/useData';
import { displayCreateAt } from '../../utils/date';
import { ProductData } from '../home/HomeProductList';
import { Button } from '../ui/Button';
import * as St from './Profile.styled';

type Props = {
  uid: string;
  params: string | undefined;
};

export type ProductDataExtends = ProductData & { status: boolean };
export type ProductStatus = 'wish' | 'onSale' | 'soldOut';
const ProfileProductList = ({ uid, params }: Props) => {
  const [list, setList] = useState<ProductStatus>('wish');
  const { wishList, wishListLoading, salesList, salesListLoading } = useData();
  // 판매 중
  const onSaleList = salesList?.filter((item) => item.status === false);
  // 판매 완료
  const soldOutList = salesList?.filter((item) => item.status === true);

  // 판매 완료 테스트 버튼
  const soldOut = (id: number) => {
    const data = salesList?.filter((item) => item.product_id === id);
    console.log('data: ', data);
    if (data) {
      data[0].status = true;
    }
  };

  if (wishListLoading) return <div>로딩중...</div>;
  if (salesListLoading) return <div>로딩중...</div>;

  return (
    <St.ProductListSection>
      <St.ListTitle>
        {uid === params ? (
          <>
            {' '}
            <St.ListBtn className={list ? 'active' : ''} onClick={() => setList(true)}>
              찜 목록
            </St.ListBtn>
            <St.ListBtn className={list ? '' : 'active'} onClick={() => setList(false)}>
              판매 목록
            </St.ListBtn>
          </>
        ) : (
          <St.ListBtn>판매 목록</St.ListBtn>
        )}
      </St.ListTitle>

      {/* 리스트 영역 */}
      <St.ListWrapper>
        <ul>
          {(() => {
            const wishListExtends: ProductDataExtends[] = wishList!.map((item) => ({
              ...item,
              status: false,
            }));

            switch (list) {
              case 'wish':
                return <ListItem name={list} list={wishListExtends!} />;
              case 'onSale':
                return <ListItem name={list} list={onSaleList!} />;
              case 'soldOut':
                return <ListItem name={list} list={soldOutList!} soldOut={soldOut} />;
              default:
                return null;
            }
          })()}
        </ul>
      </St.ListWrapper>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
