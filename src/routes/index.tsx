import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./main-page";
import { HistoryPage } from "./history-page";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/history", element: <HistoryPage /> },
  ]);

  return <RouterProvider router={router} />;
};
