import { FC } from "react";
import styles from "./error-toast.module.scss";
import { CloseIcon } from "@/assets/close-icon";

interface IError {
  text: string;
}

export const ErrorToast: FC<IError> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div></div>
      <p>{text}</p>
      <button
        onClick={() => window.location.reload()}
        title="Close"
        aria-label="Close"
        className={styles.close}
      >
        <CloseIcon />
      </button>
    </div>
  );
};
