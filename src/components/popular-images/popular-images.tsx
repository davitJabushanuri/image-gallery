import { useGetPopularImages } from "@/hooks/use-get-popular-images";

import styles from "./popular-images.module.scss";

export const PopularImages = () => {
  const { data, isLoading, isError } = useGetPopularImages();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={styles.container}>
      {data?.map((image) => {
        return (
          <div key={image.id}>
            <img
              src={image?.urls.regular}
              alt={image?.alt_description}
              title={image.description}
            />
          </div>
        );
      })}
    </div>
  );
};
