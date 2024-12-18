import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
export default function PublicRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }
  return <Outlet />
}
