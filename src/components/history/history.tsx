import { FC, useState } from "react";
import styles from "./history.module.scss";
import { CloseIcon } from "@/assets/close-icon";
import { NoResults } from "../no-results";

interface IHistory {
  query: string;
  setQuery: (query: string) => void;
}

export const History: FC<IHistory> = ({ query, setQuery }) => {
  const [history, setHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("searchQuery") as string) || [],
  );
  if (history.length === 0) {
    return <NoResults text="Your search history is empty" />;
  }

  return (
    <aside aria-label="Search history" className={styles.container}>
      {history?.reverse()?.map((historyQuery: string) => {
        return (
          <div key={historyQuery}>
            <button
              className={styles.search}
              onClick={() => setQuery(historyQuery)}
            >
              {historyQuery}
            </button>
            <button
              aria-label={`Delete "${historyQuery}" from history`}
              title={`Delete "${historyQuery}" from history`}
              className={styles.delete}
              onClick={() => {
                const historyQueries = JSON.parse(
                  localStorage.getItem("searchQuery") as string,
                );
                const index = historyQueries.indexOf(historyQuery);
                historyQueries.splice(index, 1);
                localStorage.setItem(
                  "searchQuery",
                  JSON.stringify(historyQueries),
                );
                setHistory(historyQueries);
                if (query === historyQuery) setQuery("");
              }}
            >
              <CloseIcon />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
