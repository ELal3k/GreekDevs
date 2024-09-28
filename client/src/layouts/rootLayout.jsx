import { Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      <header className="bg-slate-400">
        <h1>GreekDevs</h1>
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
