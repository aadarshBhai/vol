import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // Check if admin is authenticated
  const isAuthenticated = !!localStorage.getItem("adminToken");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
