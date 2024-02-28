import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "@/routes";
import "./styles/main.scss";
import { Layout } from "./components/layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <AppRoutes />
    </Layout>
  </React.StrictMode>,
);
