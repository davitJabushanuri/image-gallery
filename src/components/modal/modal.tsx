import { FC, useEffect, useRef } from "react";

import styles from "./modal.module.scss";
import { CloseIcon } from "@/assets/close-icon";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loading-spinner";
import { IPhoto } from "@/types";
import { createPortal } from "react-dom";
import { fetchImages } from "@/api/fetch-images";

interface IModal {
  image_id: string;
  onClose: () => void;
}

export const Modal: FC<IModal> = ({ image_id, onClose }) => {
  const URL = `https://api.unsplash.com/photos/${image_id}?client_id=${
    import.meta.env.VITE_APP_ACCESS_KEY
  }`;
  const { data: image, isLoading } = useQuery<IPhoto>({
    queryKey: ["images", image_id],
    queryFn: () => fetchImages(URL),
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = Array.from(
      modal.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
      ),
    );

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    firstFocusableElement.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    const handleScroll = (e: Event) => {
      e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
    window.addEventListener("scroll", handleScroll);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      previouslyFocusedElementRef.current?.focus();
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  if (!image_id) throw new Error("Something went wrong. Try again later");

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      id="modal"
      aria-label={`${image?.alt_description} details`}
      ref={modalRef}
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
            <img src={image?.urls?.regular} alt={image?.alt_description} />
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
          <ul className={styles.stats}>
            <Stat label="Views">{image?.views?.toLocaleString()}</Stat>
            <Stat label="Likes">{image?.likes?.toLocaleString()}</Stat>
            <Stat label="Downloads">{image?.downloads?.toLocaleString()}</Stat>
          </ul>
        )}
      </div>
    </div>,
    document.body,
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
