import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "../utils/auth"

export function ProtectedRoutes() {
  if (isAuthenticated()) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}
