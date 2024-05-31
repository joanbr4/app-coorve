import React, {
  ReactNode,
  createContext,
  useContext,
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

  const value = useMemo(
    () => ({ children, user, setUser, error, setError }),
    [children, user, error]
  );

  // useEffect(() => {
  //   fetch(urls.getMe)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setUser(null);
  //     });
  // }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, useAuth };
