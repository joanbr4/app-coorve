import { useAuth } from "@/context/AuthProvider";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute({ element }: { element: ReactNode }) {
  const { user } = useAuth();

  return user ? element || <Outlet /> : element || <Outlet />;
}

function PrivateRoute({ element }: { element: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <></>;

  return user?.name ? element || <Outlet /> : <Navigate to="/signup" replace />;
}

export { PublicRoute, PrivateRoute };
