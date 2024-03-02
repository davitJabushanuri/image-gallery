import { ErrorToast } from "@/components/error-toast";
import { Gallery } from "@/components/gallery";
import { PopularImages } from "@/components/popular-images";
import { Search } from "@/components/search";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const MainPage = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div style={{ paddingInline: "1rem" }}>
      <Search setQuery={setQuery} />
      <ErrorBoundary
        FallbackComponent={ErrorToast}
        onReset={() => {
          window.location.reload();
        }}
      >
        {query === "" ? <PopularImages /> : <Gallery query={query} />}
      </ErrorBoundary>
    </div>
  );
};
