import { FC, useState, useRef, useEffect } from "react";
import { useSearchImages } from "@/hooks/use-search-images";
import { IPhoto } from "../types";
import { Image } from "@/components/image";

import styles from "./gallery.module.scss";
interface IGallery {
  query: string;
}

export const Gallery: FC<IGallery> = ({ query }) => {
  const {
    data: images,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSearchImages({ query });

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [hasNextPage, isIntersecting, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={styles.container}>
      {isSuccess &&
        images?.pages.map((page) => {
          return page?.results?.map((image: IPhoto, i: number) => {
            if (i === page.results.length - 1) {
              return (
                <div ref={ref} key={image.id}>
                  <Image image={image} />
                </div>
              );
            } else {
              return (
                <div key={image.id}>
                  <Image image={image} />
                </div>
              );
            }
          });
        })}
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};
