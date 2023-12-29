import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteProducts } from '../../hooks/uiHook/useInfiniteProducts';
import { useInfiniteScroll } from '../../hooks/uiHook/useInfiniteScroll';
import { ReactComponent as Heart } from '../../styles/assets/heart.svg';
import * as St from './ProductLoader.styled';

const ProductLoader = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
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
          <span>검색 결과: {search}</span>
        </St.TitleWrapper>

        <St.ProductWrapper>
          <St.List>
            {products?.pages.map((page, i) => {
              if (page.length === 0) return null;

              return (
                <>
                  {page?.map((product, i) => (
                    // key 수정 필요
                    <li key={i}>
                      {product.productImg ? <img src={product.productImg[0]} alt="" /> : <img src="" alt="" />}
                      <St.HeartBox>
                        <Heart />
                        <span>1</span>
                      </St.HeartBox>
                      <div>
                        <p>{product.title}</p>
                        <p>{product.content}</p>
                        <p>{product.price}</p>
                      </div>
                    </li>
                  ))}
                </>
              );
            })}
          </St.List>
        </St.ProductWrapper>
      </St.Container>

      {isFetchingNextPage && <p>로딩 중...</p>}

      {/* observer Araa */}
      {hasNextPage && <div ref={loadMoreRef}></div>}
    </>
  );
};

export default ProductLoader;
