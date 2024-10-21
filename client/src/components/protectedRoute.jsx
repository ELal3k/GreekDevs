import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  console.log("protectedRoute", isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
