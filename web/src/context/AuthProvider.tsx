import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  // useContext,
  // useEffect,
  useMemo,
  useState,
} from "react";
// import { urls } from "../constants";
import { TUser } from "@/types/types";

export type TAuthContext = {
  user: TUser;
  children: React.ReactNode;
  setUser: (user: TUser) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
};

const AuthContext = createContext<TAuthContext | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser>(null);
  console.log("userProv", user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({ children, user, setUser, error, setError, loading }),
    [children, user, error, loading]
  );

  useEffect(() => {
    fetch("/me", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, useAuth };
