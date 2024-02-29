import { Gallery } from "@/components/gallery";
import { History } from "@/components/history";
import { useState } from "react";

export const HistoryPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        paddingInline: "1rem",
      }}
    >
      <History setQuery={setQuery} />
      <Gallery query={query} />
    </div>
  );
};
