import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteProducts } from '../../hooks/uiHook/useInfiniteProducts';
import { useInfiniteScroll } from '../../hooks/uiHook/useInfiniteScroll';
import { ReactComponent as Heart } from '../../styles/assets/heart.svg';
import { displayCreateAt } from '../../utils/date';
import * as St from './ProductLoader.styled';

const ProductLoader = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams('');
  const search = searchParams.get('search');
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data: products, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteProducts(search || '');

  useInfiniteScroll({
    target: loadMoreRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <St.Container>
        <St.TitleWrapper>
          <span>{`${search}에 대한 결과`}</span>
        </St.TitleWrapper>

        <div>
          <St.List>
            {products?.pages.map((page, i) => {
              if (page?.length === 0) return null;

              return (
                <React.Fragment key={i}>
                  {page?.map((item, i) => {
                    const date = displayCreateAt(item.created_at);
                    return (
                      <li key={i} onClick={() => navigate(`/detail/${item.product_id}`, { state: item })}>
                        {item.product_img ? <img src={item.product_img[0]} alt="" /> : <img src="" alt="" />}
                        <St.HeartBox>
                          <Heart />
                          <span>{item.like_count}</span>
                        </St.HeartBox>
                        <St.Date>{date}</St.Date>
                        <St.Content>
                          <p>{item.title}</p>
                          <p>{item.content}</p>
                          <div>
                            <p>{item.price}</p>
                            <p>원의 가치</p>
                          </div>
                        </St.Content>
                      </li>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </St.List>
        </div>
      </St.Container>

      {isFetchingNextPage && <p>로딩 중...</p>}

      {/* observer Araa */}
      {hasNextPage && <div ref={loadMoreRef}></div>}
    </>
  );
};

export default ProductLoader;
