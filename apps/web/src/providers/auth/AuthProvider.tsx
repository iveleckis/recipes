import { type PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });

  const handleSetToken = (accessToken: string | null) => {
    setToken(accessToken);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
}
