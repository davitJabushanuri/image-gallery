import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./error-fallback.module.scss";
import { IErrorFallback } from "@/types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      throwOnError: true,
    },
  },
});

interface IAppProvider {
  children: React.ReactNode;
}

export const AppProvider: FC<IAppProvider> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onReset={() => {
        window.location.assign(window.location.origin);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export const GlobalErrorFallback: FC<IErrorFallback> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.alert}>
        <h2>Something's broken</h2>
        <p>{error.message}</p>
        <button onClick={() => resetErrorBoundary()}>Try again</button>
      </div>
    </div>
  );
};
