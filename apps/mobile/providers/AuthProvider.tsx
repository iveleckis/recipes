import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContextValues = {
  token: string | null;
  setToken: (token: string) => void;
} | null;

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export const AuthContext = createContext<AuthContextValues>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
