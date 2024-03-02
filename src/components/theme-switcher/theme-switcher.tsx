import { MoonIcon } from "@/assets/moon-icon";
import { SunIcon } from "@/assets/sun-icon";
import { useEffect, useState } from "react";

import styles from "./theme-switcher.module.scss";

type ITheme = "light" | "dark";

export const ThemeSwitcher = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const theme = document.documentElement.dataset.theme;

  const [currentTheme, setCurrentTheme] = useState<ITheme>(
    theme === "light" || theme === "dark"
      ? theme
      : prefersDarkMode
      ? "dark"
      : "light",
  );

  const handleThemeChange = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    setCurrentTheme(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as ITheme;
    if (localTheme) {
      document.documentElement.dataset.theme = localTheme;
      setCurrentTheme(localTheme);
    }
  }, []);

  return (
    <button
      aria-label={
        currentTheme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      className={styles.container}
      onClick={handleThemeChange}
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
