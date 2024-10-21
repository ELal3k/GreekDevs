import { createContext, useState } from "react"

export const AuthContext = createContext()

function initializeCount() {
  const token = localStorage.getItem("token")
  const booleanToken = !!token
  return booleanToken
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(initializeCount)

  const login = (token) => {
    localStorage.setItem("token", token)
    setisAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setisAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
