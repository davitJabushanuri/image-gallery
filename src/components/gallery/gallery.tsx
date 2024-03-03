import { FC, useRef, useCallback } from "react";
import { useSearchImages } from "@/hooks/use-search-images";
import { Image, ImageFallback } from "@/components/image";

import styles from "./gallery.module.scss";
import { IPhoto } from "@/types";
import { NoResults } from "@/components/no-results";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorBoundary } from "react-error-boundary";
interface IGallery {
  query: string;
}

interface IPage {
  pages: number;
  total_pages: number;
  results: IPhoto[];
}

export const Gallery: FC<IGallery> = ({ query }) => {
  const {
    data: images,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchImages({ query });

  const hasNextPage =
    (images?.pageParams.at(-1) as number) < images?.pages[0].total_pages;

  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, isFetchingNextPage],
  );

  if (isLoading) return <LoadingSpinner />;

  if (isSuccess && images?.pages[0].results.length === 0) {
    return <NoResults text={`No results found for "${query}"`} />;
  }

  return (
    <>
      <section>
        {query && <h1 id="search-heading">Search results for: {query}</h1>}
        <ul aria-labelledby="search-heading" className={styles.container}>
          {isSuccess &&
            images?.pages.map((page: IPage) => {
              return page?.results?.map((image, i) => {
                if (i === page.results.length - 1) {
                  return (
                    <li ref={ref} key={image.id}>
                      <ErrorBoundary fallback={<ImageFallback />}>
                        <Image image={image} />
                      </ErrorBoundary>
                    </li>
                  );
                }
                return (
                  <li key={image.id}>
                    <ErrorBoundary fallback={<ImageFallback />}>
                      <Image image={image} />
                    </ErrorBoundary>
                  </li>
                );
              });
            })}
        </ul>
      </section>
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};
