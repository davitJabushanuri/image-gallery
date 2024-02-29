import { FC } from "react";

import styles from "./modal.module.scss";
import { CloseIcon } from "@/assets/close-icon";
import { useQuery } from "@tanstack/react-query";

interface IModal {
  image_id: string;
  onClose: () => void;
}

const fetchImage = async (image_id: string) => {
  const URL = `https://api.unsplash.com/photos/${image_id}?client_id=${
    import.meta.env.VITE_APP_ACCESS_KEY
  }`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const Modal: FC<IModal> = ({ image_id, onClose }) => {
  const {
    data: image,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images", image_id],
    queryFn: () => fetchImage(image_id),
  });

  if (isLoading || isError) return null;

  return (
    <dialog
      open
      className={styles.container}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.dialog}>
        <button
          onClick={() => onClose()}
          title="Close"
          aria-label="Close"
          className={styles.close}
        >
          <CloseIcon />
        </button>
        <div className={styles.image}>
          <img src={image.urls.regular} alt={image.alt_description} />
        </div>

        <div className={styles.stats}>
          <Stat label="Views" value={image.views} />
          <Stat label="Likes" value={image.likes} />
          <Stat label="Downloads" value={image.downloads} />
        </div>
      </div>
    </dialog>
  );
};

interface IStat {
  label: string;
  value: number;
}

const Stat = ({ label, value }: IStat) => {
  return (
    <div className={styles.stat}>
      <span>{label}</span>
      {value.toLocaleString()}
    </div>
  );
};
