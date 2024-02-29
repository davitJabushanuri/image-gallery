import { FC, useState } from "react";
import { Modal } from "@/components/modal";
import { IPhoto } from "../types";

interface IImage {
  image: IPhoto;
}

import styles from "./image.module.scss";

export const Image: FC<IImage> = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className={styles.container}
      >
        <img
          srcSet={`${image?.urls.thumb} 200w, ${image?.urls.small} 400w, ${image?.urls.regular} 1080w`}
          alt={image?.alt_description}
          title={image?.alt_description}
          aspect-ratio={image.width + ` / ` + image.height}
        />
        <span className={styles.overlay} />
      </button>

      {isOpen && (
        <Modal
          image_id={image.id}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};
