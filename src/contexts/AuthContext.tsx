import { createContext, useContext } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({ isAuth: false });

export const AuthProvider = ({ children }: AuthContextProps) => {
  const { isAuth } = useAuthStatus();

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);