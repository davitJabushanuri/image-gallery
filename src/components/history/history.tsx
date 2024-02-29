import { FC, useState } from "react";
import styles from "./history.module.scss";
import { CloseIcon } from "@/assets/close-icon";

interface IHistory {
  setQuery: (query: string) => void;
}

export const History: FC<IHistory> = ({ setQuery }) => {
  const [history, setHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("searchQuery") as string) || [],
  );
  if (history.length === 0) {
    return (
      <h2 className={styles.emptyHistory}>Your search history is empty</h2>
    );
  }

  return (
    <div className={styles.container}>
      {history?.map((query: string) => {
        return (
          <div key={query}>
            <button className={styles.search} onClick={() => setQuery(query)}>
              {query}
            </button>
            <button
              aria-label="Delete from history"
              title="Delete from history"
              className={styles.delete}
              onClick={() => {
                const searchQueries = JSON.parse(
                  localStorage.getItem("searchQuery") as string,
                );
                const index = searchQueries.indexOf(query);
                searchQueries.splice(index, 1);
                localStorage.setItem(
                  "searchQuery",
                  JSON.stringify(searchQueries),
                );
                setHistory(searchQueries);
              }}
            >
              <CloseIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
};
