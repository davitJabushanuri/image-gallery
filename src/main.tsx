import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "@/routes";
import "@/styles/main.scss";
import { Layout } from "@/components/layout";
import { AppProvider } from "@/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AppProvider>
  </React.StrictMode>,
);
