import { Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      <header>
        <h1>GreekDevs</h1>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  )
}
