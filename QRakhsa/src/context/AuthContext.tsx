import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userId: string | null;
  authToken: string | null;
  login: (id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("authToken"));

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    if (authToken) localStorage.setItem("authToken", authToken);
  }, [userId, authToken]);

  const login = (id: string, token: string) => {
    setUserId(id);
    setAuthToken(token);
    localStorage.setItem("userId", id);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUserId(null);
    setAuthToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ userId, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
