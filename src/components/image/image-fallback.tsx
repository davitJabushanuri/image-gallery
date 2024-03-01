import styles from "./image.module.scss";

import Image from "@/assets/broken.png";

export const ImageFallback = () => {
  return (
    <div className={styles.fallback}>
      <img src={Image} alt="fallback" />
    </div>
  );
};
