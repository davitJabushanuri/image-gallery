import { NavLink } from "react-router-dom";

import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <nav aria-label="Primary" className={styles.container}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="/history"
      >
        History
      </NavLink>
    </nav>
  );
};
