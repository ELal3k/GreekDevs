import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setisAuthenticated(!!token)
  }, [])

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
