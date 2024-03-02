import { FC } from "react";
import styles from "./error-toast.module.scss";
import { CloseIcon } from "@/assets/close-icon";
import { IErrorFallback } from "@/types";

export const ErrorToast: FC<IErrorFallback> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className={styles.container}>
      <div></div>
      <p>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        title="Close"
        aria-label="Close"
        className={styles.close}
      >
        <CloseIcon />
      </button>
    </div>
  );
};
