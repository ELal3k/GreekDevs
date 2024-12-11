import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import UserDropdown from "../components/UI/userDropdown"

export default function RootLayout() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="sticky top-0 z-0 bg-slate-600 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
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

                  <li>{user && <UserDropdown user={user} />}</li>
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
      <main className="container mx-auto flex-grow bg-slate-100 px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-slate-600 p-4 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GreekDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
