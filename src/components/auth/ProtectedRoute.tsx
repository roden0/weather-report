"use client";

import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
