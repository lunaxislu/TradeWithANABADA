import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSalesList, getZzimList } from '../../API/supabase.api';
import { displayCreateAt } from '../../utils/date';
import { ProductData } from '../home/HomeProductList';
import { Button } from '../ui/Button';
import * as St from './Profile.styled';

type Props = {
  uid: string;
  params: string | undefined;
};

const ProfileProductList = ({ uid, params }: Props) => {
  const navigate = useNavigate();
  const [list, setList] = useState(true);
  const [zzims, setZzims] = useState<ProductData[]>([]);
  const [sales, setSales] = useState<ProductData[]>([]);

  const showZzimList = useCallback(async () => {
    const list = await getZzimList(uid);
    setList(true);
    setZzims(list);
  }, [uid]);

  const showSalesList = useCallback(async () => {
    const list = await getSalesList(params!);
    setList(false);
    setSales(list);
  }, [params]);

  // 찜 목록에서 상품 삭제
  const deleteZzimProduct = () => {};

  // 상품으로 이동
  const moveToDetailPage = (item: ProductData) => navigate(`/detail/${item.product_id}`, { state: item });

  useEffect(() => {
    if (uid === params) showZzimList();
    else showSalesList();
  }, [uid, params, showZzimList, showSalesList]);

  return (
    <St.ProductListSection>
      <St.ListTitle>
        {uid === params ? (
          <>
            {' '}
            <St.ListBtn className={list ? 'active' : ''} onClick={showZzimList}>
              찜 목록
            </St.ListBtn>
            <St.ListBtn className={list ? '' : 'active'} onClick={showSalesList}>
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
          {list ? (
            <>
              {zzims?.map((item, i) => {
                const date = displayCreateAt(item.created_at);
                return (
                  <li key={item.product_id} onClick={() => moveToDetailPage(item)}>
                    <div>
                      <St.ListImage>
                        {item.product_img && item.product_img.length > 0 ? (
                          <img src={item.product_img[0]} alt="" />
                        ) : (
                          <img src="" alt="" />
                        )}
                      </St.ListImage>

                      <St.PostsWrapper>
                        <p>제목: {item.title}</p>
                        <p>내용: {item.content}</p>
                        <div>
                          <p>10,000</p>
                          <p>원의 가치</p>
                        </div>
                      </St.PostsWrapper>

                      <St.PriceWrapper>
                        <span>{date}</span>
                        <Button color="primary" onClick={deleteZzimProduct}>
                          삭제
                        </Button>
                      </St.PriceWrapper>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {sales?.map((item, i) => {
                const date = displayCreateAt(item.created_at);
                return (
                  <li key={item.product_id} onClick={() => moveToDetailPage(item)}>
                    <div>
                      <St.ListImage>
                        {item.product_img && item.product_img.length > 0 ? (
                          <img src={item.product_img[0]} alt="" />
                        ) : (
                          <img src="" alt="" />
                        )}
                      </St.ListImage>

                      <St.PostsWrapper>
                        <p>제목: {item.title}</p>
                        <p>내용: {item.content}</p>
                        <div>
                          <p>10,000</p>
                          <p>원의 가치</p>
                        </div>
                      </St.PostsWrapper>

                      <St.PriceWrapper>
                        <span>{date}</span>
                        <Button color="primary" onClick={deleteZzimProduct}>
                          삭제
                        </Button>
                      </St.PriceWrapper>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </St.ListWrapper>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
