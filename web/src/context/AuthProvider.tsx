import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import fetch from "cross-fetch";
import { TUser } from "@/types/types";
import { url_be } from "@/pages/login";
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
  const userToken = localStorage.getItem("token_auth_user");
  const payload = { auth_token_user: userToken };
  console.log("payload", payload);

  useEffect(() => {
    fetch(url_be + "/api/v1/auth/me", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Add this line
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json() as Promise<TUser>;
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, useAuth };
