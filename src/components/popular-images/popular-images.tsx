import { useGetPopularImages } from "@/hooks/use-get-popular-images";
import { Image, ImageFallback } from "@/components/image";

import styles from "./popular-images.module.scss";
import { LoadingSpinner } from "../loading-spinner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorToast } from "../error-toast";

export const PopularImages = () => {
  const { data, isLoading, isError } = useGetPopularImages();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorToast text="There was an error loading images" />;

  return (
    <div className={styles.container}>
      {data?.map((image) => {
        return (
          <div key={image.id}>
            <ErrorBoundary fallback={<ImageFallback />}>
              <Image image={image} />
            </ErrorBoundary>
          </div>
        );
      })}
    </div>
  );
};
