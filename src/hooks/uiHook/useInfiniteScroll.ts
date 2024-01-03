import { MutableRefObject, useEffect } from 'react';

type InfiniteScrollProps = {
  target: MutableRefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useInfiniteScroll = ({
  target,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollProps): void => {
  useEffect(() => {
    if (!hasNextPage || !target.current) return;

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

    const currentTarget = target.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, target]);
};
