import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

export default function RootLayout() {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 bg-slate-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold">
            GreekDevs
          </NavLink>
          <nav>
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <li>
                    <NavLink
                      to="/create-article"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-400 border-[1px] border-blue-400 px-4 py-2 rounded-md"
                          : "text-white border-[1px] border-white px-4 py-2 rounded-md hover:text-blue-100 hover:border-blue-100"
                      }
                    >
                      Create Post
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-100"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-100"
                    >
                      Log out
                    </button>
                  </li>
                  <li>
                    {user && (
                      <div className=" bg-blue-500 text-lg p-2 w-10 h-10 rounded-full flex justify-center items-center">
                        {user.username.substring(0, 1)}
                      </div>
                    )}
                  </li>
                </div>
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
      <main className="flex-grow container mx-auto px-4 py-8 bg-slate-100">
        <Outlet />
      </main>
      <footer className="bg-slate-600 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GreekDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
