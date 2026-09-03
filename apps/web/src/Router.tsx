import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import RecipeList from "./features/recipes/pages/RecipeList";
import { PrivateRoute } from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RecipeList />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: <Login />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
