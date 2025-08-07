import type React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { useAuth } from "@/context/AuthContext"

interface ProtectedRouteProps {
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAdmin = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />; // Or a specific /forbidden page
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
