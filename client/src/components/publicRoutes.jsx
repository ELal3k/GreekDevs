import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "../utils/auth"

export function PublicRoutes() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />
  } else {
    return <Outlet />
  }
}
