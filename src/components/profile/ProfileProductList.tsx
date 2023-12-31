import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tables } from '../../../database.types';
import { getSalesList, getZzimList } from '../../API/supabase.api';
import { displayCreateAt } from '../../utils/date';
import { Button } from '../ui/Button';
import * as St from './Profile.styled';

type Props = {
  uid: string;
  params: string | undefined;
};

const ProfileProductList = ({ uid, params }: Props) => {
  // console.log('uid', uid, 'params', params);
  const [list, setList] = useState(true); // true=찜 false=판매
  const [zzims, setZzims] = useState<Tables<'likes'>[]>();
  const [sales, setSales] = useState<Tables<'products'>[]>();
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const showZzimList = async () => {
    setList(true);
    const list = await getZzimList(uid);
    setZzims(list);
  };

  // 판매 목록 보여주기
  const showSalesList = async () => {
    setList(false);
    const list = await getSalesList(params as string);
    setSales(list);
  };
  // 찜 목록에서 상품 삭제
  const deleteZzimProduct = () => {};
  // 상품으로 이동
  const moveToZzimProduct = () => {
    // navigate(`/detail/ `, {state});
  };
  const moveToSalesProduct = () => {
    // navigate(`/detail/${productInfo.product_id}`, { state: productInfo });
  };

  useEffect(() => {
    {
      uid == params ? showZzimList() : showSalesList();
    }
  }, [uid, params]);

  return (
    <St.ProductListSection>
      <St.ListTitle>
        {uid === params ? (
          <>
            {' '}
            <div onClick={showZzimList}>찜 목록</div>
            <div onClick={showSalesList}>판매 목록</div>
          </>
        ) : (
          <div>판매 목록</div>
        )}
      </St.ListTitle>

      {/* 리스트 영역 */}
      <St.ListWrapper>
        <ul>
          {list ? (
            <>
              {zzims
                ?.map((p) => p.products)
                .flat()
                .map((item, i) => {
                  const date = displayCreateAt(item.created_at!);
                  return (
                    <li
                      key={item.id}
                      //   onClick={() =>
                      //     navigate(
                      //       `/detail/
                      // ${item.id}`,
                      //       { state: item },
                      //     )
                      //   }
                    >
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
                const date = displayCreateAt(item.created_at!);
                return (
                  <li key={i} onClick={moveToSalesProduct}>
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
