import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./features/auth/pages/Login";
import RecipeListPage from "./features/recipes/pages/RecipeListPage";

const router = createBrowserRouter([
  {
    path: ROUTES.auth,
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTES.recipes,
        element: <RecipeListPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.recipes} replace />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
