import { createContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

function isToken() {
  const token = localStorage.getItem("token")
  const booleanToken = !!token
  return booleanToken
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(isToken)

  const login = (token) => {
    localStorage.setItem("token", token)
    setisAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setisAuthenticated(false)
  }

  const decodeToken = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.log("no token found")
      return null
    }
    const decoded = jwtDecode(token)
    return decoded
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, decodeToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
