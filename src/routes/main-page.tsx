import { Search } from "@/components/search";
import { useState } from "react";

export const MainPage = () => {
  const [query, setQuery] = useState<string>("");

  console.log(query);

  return (
    <div style={{ paddingInline: "1rem" }}>
      <Search setQuery={setQuery} />
    </div>
  );
};
