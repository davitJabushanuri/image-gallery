import { FC, useState, useRef, useEffect } from "react";
import { useSearchImages } from "@/hooks/use-search-images";
import { Image, ImageFallback } from "@/components/image";

import styles from "./gallery.module.scss";
import { IPhoto } from "../types";
import { NoResults } from "../no-results";
import { LoadingSpinner } from "../loading-spinner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorToast } from "../error-toast";
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
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchImages({ query });

  const hasNextPage =
    (images?.pageParams.at(-1) as number) < images?.pages[0].total_pages;

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return <ErrorToast text="There was an error loading the images" />;

  if (isSuccess && images?.pages[0].results.length === 0) {
    return <NoResults text="No results found" />;
  }

  return (
    <>
      <section>
        {query && <h1 id="search-heading">Search results for: {query}</h1>}
        <ul aria-labelledby="search-heading" className={styles.container}>
          {isSuccess &&
            images?.pages.map((page: IPage) => {
              return page?.results?.map((image, i) => {
                return (
                  <li
                    aria-hidden={true}
                    ref={i === page.results.length - 1 ? ref : null}
                    key={image.id}
                  >
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
