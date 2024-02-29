import { FC } from "react";
import styles from "./gallery.module.scss";
import { useGetImages } from "@/hooks/use-get-images";

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
  } = useGetImages({ query });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={styles.container}>
      {isSuccess &&
        images?.pages.map((page) => {
          return page?.results?.map((image, i) => {
            return (
              <div key={image.id}>
                <img
                  key={i}
                  src={image?.urls.regular}
                  alt={image?.title}
                  className={styles.image}
                />
              </div>
            );
          });
        })}
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};
