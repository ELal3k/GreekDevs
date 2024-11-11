import { createContext, useState, useEffect } from "react"
import useApi from "../hooks/useApi"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

function isToken() {
  const token = localStorage.getItem("token")
  return !!token
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isToken())
  const { response: user, isLoading, fetchData } = useApi()

  useEffect(() => {
    if (isAuthenticated) {
      const decoded = decodeToken()
      if (decoded) {
        fetchData({
          url: `/users/${decoded.userId}`,
          method: "GET",
        })
      }
    }
  }, [isAuthenticated])

  const decodeToken = () => {
    const token = localStorage.getItem("token")
    if (!token) return null
    return jwtDecode(token)
  }

  const login = (token) => {
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        isLoading,
        decodeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
