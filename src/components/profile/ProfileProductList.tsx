import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { getSalesList } from '../../API/supabase.api';
import { useData } from '../../hooks/queryHook/profile/useData';
import { ProductData } from '../home/HomeProductList';
import * as St from './Profile.styled';
import ListButton from './product/ListButton';
import ListItem from './product/ListItem';

type Props = {
  uid: string;
  params: string | undefined;
  setParamUid: React.Dispatch<React.SetStateAction<string>>;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const buttonData = [
  { label: '찜 목록', state: 'wish' },
  { label: '판매 중인 상품', state: 'onSale' },
  { label: '판매 완료 상품', state: 'soldOut' },
  { label: '나의 구매 내역', state: 'purchase' },
];

export type ProductDataExtends = ProductData & { status: boolean; review_status?: boolean; purchased_user_id?: string };
export type ProductStatus = 'wish' | 'onSale' | 'soldOut' | 'purchase';

const ProfileProductList = ({ uid, params, setParamUid, setReviewModal }: Props) => {
  const [list, setList] = useState<ProductStatus>('wish');
  const [targetUserList, setTargetUserList] = useState<ProductDataExtends[]>();
  const { wishList, wishListLoading, salesList, salesListLoading, purchaseList } = useData();
  const { showBoundary } = useErrorBoundary();
  // 판매 중
  const onSaleList = salesList?.filter((item) => item.status === false);
  // 판매 완료
  const soldOutList = salesList?.filter((item) => item.status === true);

  const getTargetUserSalesList = async () => {
    const targetUserSalesList = await getSalesList(params as string);
    setTargetUserList(targetUserSalesList);
    return;
  };
  useEffect(() => {
    getTargetUserSalesList();
  }, []);

  if (wishListLoading) return <div>로딩중...</div>;
  if (salesListLoading) return <div>로딩중...</div>;

  return (
    <St.ProductListSection>
      <St.ListTitle>
        {/* 본인 로그인 시 */}
        {uid === params ? (
          buttonData.map((button) => (
            <ListButton
              key={button.state}
              label={button.label}
              state={button.state as ProductStatus}
              currentList={list}
              onClick={setList}
              wishListData={wishList!}
              onSaleListData={onSaleList!}
              soldOutListData={soldOutList!}
            />
          ))
        ) : (
          <St.ListBtn>판매 목록</St.ListBtn>
        )}
      </St.ListTitle>

      {/* 리스트 영역 */}
      <St.ListWrapper>
        {uid === params ? (
          <ul>
            {(() => {
              switch (list) {
                case 'wish':
                  return <ListItem name={list} list={wishList!} params={params} />;
                case 'onSale':
                  return <ListItem name={list} list={onSaleList!} />;
                case 'soldOut':
                  return <ListItem name={list} list={soldOutList!} />;
                case 'purchase':
                  return (
                    <ListItem
                      name={list}
                      list={purchaseList!}
                      setParamUid={setParamUid}
                      setReviewModal={setReviewModal}
                    />
                  );
                default:
                  return null;
              }
            })()}{' '}
          </ul>
        ) : (
          <ul>
            <ListItem name={list} list={targetUserList!} />
          </ul>
        )}
      </St.ListWrapper>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
