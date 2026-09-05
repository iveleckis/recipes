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
import RecipeDetails from "./features/recipes/pages/RecipeDetails";

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
        element: <RecipeList />,
      },
      {
        path: ROUTES.createRecipe,
        element: <RecipeCreate />,
      },
      {
        path: ROUTES.recipeDetails,
        element: <RecipeDetails />,
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
