import { Gallery } from "@/components/gallery";
import { Search } from "@/components/search";
import { useState } from "react";

export const MainPage = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div style={{ paddingInline: "1rem" }}>
      <Search setQuery={setQuery} />

      <Gallery query={query} />
    </div>
  );
};
