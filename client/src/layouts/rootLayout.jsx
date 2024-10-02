import { NavLink, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      <header className="bg-slate-400 flex justify-between">
        <NavLink to="/">GreekDevs</NavLink>
        <div className=" w-1/6 flex justify-between">
          <NavLink to="/edit">Create Article</NavLink>
          <NavLink to="/author_articles">My Articles</NavLink>
        </div>
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
