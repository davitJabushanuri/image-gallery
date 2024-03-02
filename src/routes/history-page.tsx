import { ErrorToast } from "@/components/error-toast";
import { Gallery } from "@/components/gallery";
import { History } from "@/components/history";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const HistoryPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        paddingInline: "1rem",
      }}
    >
      <History query={query} setQuery={setQuery} />
      <ErrorBoundary FallbackComponent={ErrorToast}>
        <Gallery query={query} />
      </ErrorBoundary>
    </div>
  );
};
