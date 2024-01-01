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

const ProfileProductList = ({ uid, params }: Props) => {
  const navigate = useNavigate();
  const [list, setList] = useState(true);
  const { remove } = useProfile();
  const { wishList, wishListLoading, salesList, salesListLoading } = useData();

  // 상품으로 이동
  const moveToDetailPage = (item: ProductData) => navigate(`/detail/${item.product_id}`, { state: item });

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
          {list ? (
            <>
              {wishList?.map((item, i) => {
                const date = displayCreateAt(item.created_at);
                return (
                  <li key={item.product_id}>
                    <div>
                      <St.ListImage>
                        {item.product_img && item.product_img.length > 0 ? (
                          <img src={item.product_img[0]} alt="" onClick={() => moveToDetailPage(item)} />
                        ) : (
                          <img src="" alt="" />
                        )}
                      </St.ListImage>

                      <St.PostsWrapper>
                        <div onClick={() => moveToDetailPage(item)}>
                          <p>제목: {item.title}</p>
                          <p>내용: {item.content}</p>
                        </div>
                        <div>
                          <p>10,000</p>
                          <p>원의 가치</p>
                        </div>
                      </St.PostsWrapper>

                      <St.PriceWrapper>
                        <span>{date}</span>
                        <Button color="primary" onClick={() => remove(item.product_id)}>
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
              {salesList?.map((item, i) => {
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
                        {/* <Button color="primary" onClick={deleteZzimProduct}>
                          삭제
                        </Button> */}
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
