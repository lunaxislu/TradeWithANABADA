import { useRef } from 'react';
import { useInfiniteProducts } from '../../hooks/uiHook/useInfiniteProducts';
import { useInfiniteScroll } from '../../hooks/uiHook/useInfiniteScroll';

const InfiniteScroll = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: products, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteProducts();

  useInfiniteScroll({
    target: loadMoreRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div>
      {products?.pages.map((page, i) => {
        // 해당 부분 수정 필요
        if (page.length === 0) {
          return <></>;
        }
        return (
          // 해당 부분 수정 필요
          <div
            style={{
              height: '500px',
              border: '1px solid black',
              display: 'flex',
              flexDirection: 'column',
            }}
            key={i}
          >
            {page?.map((product) => <div key={product.title}>{product.content}</div>)}
          </div>
        );
      })}

      {isFetchingNextPage && <p>Loading...</p>}

      {hasNextPage && <div ref={loadMoreRef}></div>}
    </div>
  );
};

export default InfiniteScroll;
