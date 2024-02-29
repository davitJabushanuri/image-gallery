import { FC } from "react";
import { IPhoto } from "../types";

interface IImage {
  image: IPhoto;
}

import styles from "./image.module.scss";
export const Image: FC<IImage> = ({ image }) => {
  return (
    <button className={styles.container}>
      <img
        srcSet={`${image?.urls.thumb} 200w, ${image?.urls.small} 400w, ${image?.urls.regular} 1080w, ${image?.urls.full} 1400w`}
        alt={image?.alt_description}
        title={image?.alt_description}
        loading="lazy"
        aspect-ratio={image.width + ` / ` + image.height}
      />
      <span className={styles.overlay} />
    </button>
  );
};
