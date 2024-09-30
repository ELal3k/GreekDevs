import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/rootLayout.jsx"
import ErrorPage from "./pages/errorPage.jsx"
import HomePage from "./pages/homePage.jsx"
import CreateArticle from "./pages/createARticlePage.jsx"
import ArticlePage from "./pages/articlePage.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/edit",
        element: <CreateArticle />,
      },
      {
        path: "/article/:id",
        element: <ArticlePage />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
