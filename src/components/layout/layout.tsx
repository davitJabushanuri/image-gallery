import { FC } from "react";
import styles from "./layout.module.scss";
import { Navbar } from "@/components/navbar";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
      {children}
    </div>
  );
};
