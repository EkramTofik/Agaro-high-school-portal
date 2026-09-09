import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Wrap any admin page: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  const { user, isAdmin } = useAuth();
  const token = localStorage.getItem("token");

  if (!token || !user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
