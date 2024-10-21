import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

export default function RootLayout() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold">
            GreekDevs
          </NavLink>
          <nav>
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-400"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-400"
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {" "}
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-400"
                      }
                    >
                      Sign Up
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-400"
                      }
                    >
                      Log In
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-slate-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GreekDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
