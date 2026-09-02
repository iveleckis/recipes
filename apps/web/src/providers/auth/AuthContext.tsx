import { createContext } from "react";

type AuthContextValues = {
  token: string | null;
  setToken: (token: string | null) => void;
} | null;

export const AuthContext = createContext<AuthContextValues>(null);
