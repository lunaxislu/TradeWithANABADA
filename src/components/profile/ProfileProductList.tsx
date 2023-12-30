import { useEffect, useState } from 'react';
import { getPopularProducts } from '../../API/supabase.api';
import { displayCreateAt } from '../../utils/date';
import { Button } from '../ui/Button';
import * as St from './Profile.styled';

type ProductListProps = {
  product_id: number;
  title: string;
  content: string;
  created_at: string;
  price: string;
  product_img: string[];
  user_id: string;
  like_count: number;
  hash_tags: string[];
  category1_name: string;
  category2_name: string;
}[];

const ProfileProductList = () => {
  const [products, setProducts] = useState<ProductListProps>([]);

  useEffect(() => {
    const getProductList = async () => {
      const data = await getPopularProducts(4);
      console.log('data: ', data);
      setProducts(data);
    };
    getProductList();
  }, []);

  const showZZimList = () => {
    // 클릭하면 찜 목록 보여주기
  };
  const showSalesList = () => {
    // 클릭하면 판매 목록 보여주기
  };
  const deleteProduct = () => {
    // 클릭하면 상품 삭제
  };

  return (
    <St.ProductListSection>
      <St.ListTitle>
        <div color="success" onClick={showZZimList}>
          찜 목록
        </div>
        <div color="success" onClick={showSalesList}>
          판매 목록
        </div>
      </St.ListTitle>

      {/* 리스트 영역 */}
      <St.ListWrapper>
        <ul>
          {products?.map((item, i) => {
            const date = displayCreateAt(item.created_at);
            return (
              <li key={i}>
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
      <St.ProductListArea></St.ProductListArea>
    </St.ProductListSection>
  );
};

export default ProfileProductList;
