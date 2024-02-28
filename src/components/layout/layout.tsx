import { FC } from "react";
import styles from "./layout.module.scss";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
