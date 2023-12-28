import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { getProducts } from '../API/supabase.api';

const Home = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data: products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => await getProducts(pageParam),
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length === 0) {
        return;
      } else {
        return allPage.length + 1;
      }
    },
  });

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }
      },
      { threshold: 0.3 },
    );

    const el = loadMoreRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      {products?.pages.map((page, i) => {
        if (page.length === 0) {
          return <></>;
        }
        return (
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

      {/* Loading spinner */}
      {isFetchingNextPage && <p>Loading...</p>}

      {/* 옵저버 역할 */}
      {hasNextPage && <div ref={loadMoreRef}></div>}
    </div>
  );
};

export default Home;
