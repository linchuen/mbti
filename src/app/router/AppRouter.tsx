import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { HomePage } from "../../modules/home/feature/HomePage";
import { FunctionListPage } from "../../modules/cognitive-function/feature/pages/FunctionListPage";
import { FunctionDetailPage } from "../../modules/cognitive-function/feature/pages/FunctionDetailPage";
import { TypeListPage } from "../../modules/personality-type/feature/pages/TypeListPage";
import { TypeDetailPage } from "../../modules/personality-type/feature/pages/TypeDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "functions", element: <FunctionListPage /> },
      { path: "functions/:id", element: <FunctionDetailPage /> },
      { path: "types", element: <TypeListPage /> },
      { path: "types/:type_code", element: <TypeDetailPage /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
