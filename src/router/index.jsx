import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Merchants from "../pages/Merchants";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/merchants", element: <Merchants /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
