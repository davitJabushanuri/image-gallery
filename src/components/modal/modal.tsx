import { FC } from "react";

import styles from "./modal.module.scss";
import { CloseIcon } from "@/assets/close-icon";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../loading-spinner";
import { IPhoto } from "../types";

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
  } = useQuery<IPhoto>({
    queryKey: ["images", image_id],
    queryFn: () => fetchImage(image_id),
  });

  if (isError) return <div>Error</div>;

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
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.image}>
            <img src={image?.urls.regular} alt={image?.alt_description} />
          </div>
        )}

        {isLoading ? (
          <div className={styles.stats}>
            <Stat label="Views">
              <Skeleton width="120px" />
            </Stat>
            <Stat label="Likes">
              <Skeleton width="70px" />
            </Stat>
            <Stat label="Downloads">
              <Skeleton width="80px" />
            </Stat>
          </div>
        ) : (
          <div className={styles.stats}>
            <Stat label="Views">{image?.views.toLocaleString()}</Stat>
            <Stat label="Likes">{image?.likes.toLocaleString()}</Stat>
            <Stat label="Downloads">{image?.downloads.toLocaleString()}</Stat>
          </div>
        )}
      </div>
    </dialog>
  );
};

interface IStat {
  label: string;
  children?: React.ReactNode;
}

const Stat = ({ label, children }: IStat) => {
  return (
    <div className={styles.stat}>
      <span>{label}</span>
      {children}
    </div>
  );
};

interface ISkeleton {
  width?: string;
}

const Skeleton = ({ width }: ISkeleton) => {
  return (
    <div
      style={{
        width: width ?? "100%",
        height: "1.2rem",
      }}
      className={styles.skeleton}
    ></div>
  );
};
