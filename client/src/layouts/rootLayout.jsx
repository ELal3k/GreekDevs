import { NavLink, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      <header className="bg-slate-400 flex justify-between">
        <NavLink to="/">GreekDevs</NavLink>
        <NavLink to="/edit">Create Article</NavLink>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>
        <h1 className=" bg-fuchsia-500">Footer</h1>
      </footer>
    </>
  )
}
