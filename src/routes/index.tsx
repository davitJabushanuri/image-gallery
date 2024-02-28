import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./main-page";
import { HistoryPage } from "./history-page";
import { Layout } from "@/components/layout";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
