import { useGetPopularImages } from "@/hooks/use-get-popular-images";
import { Image } from "@/components/image";

import styles from "./popular-images.module.scss";
import { LoadingSpinner } from "../loading-spinner";

export const PopularImages = () => {
  const { data, isLoading, isError } = useGetPopularImages();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error</div>;

  return (
    <div className={styles.container}>
      {data?.map((image) => {
        return (
          <div key={image.id}>
            <Image image={image} />
          </div>
        );
      })}
    </div>
  );
};
