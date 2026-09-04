import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import RecipeList from "./features/recipes/pages/RecipeList";
import RecipeCreate from "./features/recipes/pages/RecipeCreate";
import { PrivateRoute } from "./components/PrivateRoute";

const router = createBrowserRouter([
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
    path: "/auth",
    element: <Login />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
