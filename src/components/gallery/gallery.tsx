import { FC, useState, useRef, useEffect } from "react";
import { useSearchImages } from "@/hooks/use-search-images";
import { Image } from "@/components/image";

import styles from "./gallery.module.scss";
import { IPhoto } from "../types";
import { NoResults } from "../no-results";
import { LoadingSpinner } from "../loading-spinner";
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
  const ref = useRef<HTMLDivElement>(null);

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

  if (isError) return <div>Error</div>;

  if (isSuccess && images?.pages[0].results.length === 0) {
    return <NoResults text="No results found" />;
  }

  return (
    <>
      <div className={styles.container}>
        {isSuccess &&
          images?.pages.map((page: IPage) => {
            return page?.results?.map((image, i) => {
              return (
                <div
                  ref={i === page.results.length - 1 ? ref : null}
                  key={image.id}
                >
                  <Image image={image} />
                </div>
              );
            });
          })}
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};
