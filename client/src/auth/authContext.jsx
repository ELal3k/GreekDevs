import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import useApi from "../hooks/useApi"

export const AuthContext = createContext()

function isToken() {
  const token = localStorage.getItem("token")
  const booleanToken = !!token
  return booleanToken
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(isToken)
  const { response: user, isLoading, error, fetchData } = useApi()

  const decodeToken = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      return null
    }

    return jwtDecode(token)
  }

  const fetchUserData = async () => {
    const decoded = decodeToken()
    if (!decoded) return

    fetchData({
      url: `/users/${decoded.userId}`,
      method: "GET",
    })
  }

  const login = (token) => {
    localStorage.setItem("token", token)
    setisAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setisAuthenticated(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData()
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        decodeToken,
        user,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
