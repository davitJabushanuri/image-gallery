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
    <section>
      <h1 id="popular-heading">Top 20 most popular images</h1>
      <ul aria-labelledby="popular-heading" className={styles.container}>
        {data?.map((image) => {
          return (
            <li aria-hidden={true} key={image.id}>
              <ErrorBoundary fallback={<ImageFallback />}>
                <Image image={image} />
              </ErrorBoundary>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
