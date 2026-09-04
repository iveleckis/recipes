import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./features/auth/pages/Login";
import RecipeList from "./features/recipes/pages/RecipeList";
import RecipeCreate from "./features/recipes/pages/RecipeCreate";
import { PrivateRoute } from "./components/PrivateRoute";
import { ROUTES } from "./constants/routes";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/recipes",
        element: <RecipeList />,
      },
      {
        path: "/recipes/create",
        element: <RecipeCreate />,
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
