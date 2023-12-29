import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useInfiniteProducts } from '../../hooks/uiHook/useInfiniteProducts';
import { useInfiniteScroll } from '../../hooks/uiHook/useInfiniteScroll';

const ProductLoader = () => {
  const { search } = useLocation();
  const decodedSearch = decodeURIComponent(search).replaceAll('?', '');
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data: products, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteProducts(decodedSearch);

  useInfiniteScroll({
    target: loadMoreRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div>
      {products?.pages.map((page, i) => {
        if (page.length === 0) return null;

        return (
          // 인라인 스타일링은 추후에 styled-components로 변경
          <div
            style={{
              height: '500px',
              border: '1px solid black',
              display: 'flex',
              flexDirection: 'column',
            }}
            key={i}
          >
            {page?.map((product) => {
              return (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <div>{product.title}</div>
                  <div>{product.content}</div>
                  <div>{product.price}</div>
                </div>
              );
            })}
          </div>
        );
      })}

      {isFetchingNextPage && <p>로딩 중...</p>}

      {/* observer Araa */}
      {hasNextPage && <div ref={loadMoreRef}></div>}
    </div>
  );
};

export default ProductLoader;
