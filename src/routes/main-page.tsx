import { Gallery } from "@/components/gallery";
import { PopularImages } from "@/components/popular-images";
import { Search } from "@/components/search";
import { useState } from "react";

export const MainPage = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div style={{ paddingInline: "1rem" }}>
      <Search setQuery={setQuery} />

      {query === "" ? <PopularImages /> : <Gallery query={query} />}
    </div>
  );
};
