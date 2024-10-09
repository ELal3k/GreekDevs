import { NavLink, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold">
            GreekDevs
          </NavLink>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/author_articles"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400" : "hover:text-blue-400"
                  }
                >
                  My Articles
                </NavLink>
              </li>
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
