import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth/useAuth";

export function PrivateRoute() {
  const authContext = useAuth();

  if (!authContext?.token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
