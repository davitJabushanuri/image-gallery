import { FC } from "react";
import styles from "./no-results.module.scss";

interface INoResults {
  text: string;
}

export const NoResults: FC<INoResults> = ({ text }) => {
  return <h2 className={styles.container}>{text}</h2>;
};
