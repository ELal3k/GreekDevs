import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/rootLayout.jsx"
import ErrorPage from "./pages/errorPage.jsx"
import HomePage from "./pages/homePage.jsx"
import CreateArticle from "./pages/createArticlePage.jsx"
import ArticlePage from "./pages/articlePage.jsx"
import Dashboard from "./pages/dashboard.jsx"
import EditArticlePage from "./pages/editArticlePage.jsx"
import RegisterPage from "./pages/registerPage.jsx"
import LoginPage from "./pages/loginPage.jsx"

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
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/author_articles/edit/:id",
        element: <EditArticlePage />,
      },
      {
        path: "/signup",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
