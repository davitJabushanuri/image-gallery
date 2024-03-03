import { FC, useState } from "react";
import { Modal } from "@/components/modal";
import { IPhoto } from "@/types";

interface IImage {
  image: IPhoto;
}

import styles from "./image.module.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorToast } from "../error-toast";

export const Image: FC<IImage> = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        style={{
          backgroundColor: image?.color,
          backgroundImage: `url(${image?.urls.thumb})`,
          backgroundSize: "cover",
          aspectRatio: `${image?.width} / ${image?.height}`,
        }}
        aria-label={image?.alt_description}
        role="link"
        onClick={() => {
          setIsOpen(true);
        }}
        className={styles.container}
      >
        <img
          srcSet={`${image?.urls?.thumb} 200w, ${image?.urls?.small} 400w, ${image?.urls?.regular} 1080w`}
          alt={image?.alt_description}
          title={image?.alt_description}
          loading="lazy"
        />
        <span className={styles.overlay} />
      </button>

      {isOpen && (
        <ErrorBoundary
          FallbackComponent={ErrorToast}
          onReset={() => {
            window.location.reload();
          }}
        >
          <Modal
            image_id={image.id}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </ErrorBoundary>
      )}
    </>
  );
};
