import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth/useAuth";

export function PrivateRoute({ children }: PropsWithChildren) {
  const authContext = useAuth();

  if (!authContext?.token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
