import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';
import { getUserData, getZzimList } from '../../API/supabase.api';
import { displayCreateAt } from '../../utils/date';
import { Button } from '../ui/Button';
import * as St from './Profile.styled';

const ProfileProductList = () => {
  const [products, setProducts] = useState<Tables<'likes'>[]>();

  const showZzimList = async () => {
    const u = await getUserData();
    if (u) {
      const list = await getZzimList(u.id);
      setProducts(list);
    }
  };

  // 판매 목록 보여주기
  const showSalesList = () => {};
  // 상품 삭제
  const deleteProduct = () => {};
  // 상품으로 이동
  const moveToProduct = () => {};

  useEffect(() => {
    // 찜 목록 보여주기
    showZzimList();
  }, []);

  return (
    <St.ProductListSection>
      <St.ListTitle>
        <div onClick={showZzimList}>찜 목록</div>
        <div onClick={showSalesList}>판매 목록</div>
      </St.ListTitle>

      {/* 리스트 영역 */}
      <St.ListWrapper>
        <ul>
          {products
            ?.map((p) => p.products)
            .flat()
            .map((item, i) => {
              const date = displayCreateAt(item.created_at!);
              return (
                <li key={item.id} onClick={moveToProduct}>
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
                      <Button color="primary" onClick={deleteProduct}>
                        삭제
                      </Button>
                    </St.PriceWrapper>
                  </div>
                </li>
              );
            })}
        </ul>
      </St.ListWrapper>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
