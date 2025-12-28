import { createContext, useContext, useState } from "react";

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: null,
    isAuthenticated: false,
    loading: false,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
