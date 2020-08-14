import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { authLoginEmail } from "../firebase/authService.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageUser = localStorage.getItem("@user");
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  async function signIn(email, password) {
    const response = await authLoginEmail(email, password);
    setUser(response);
    localStorage.setItem("@user", JSON.stringify(response));
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
