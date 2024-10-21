import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./auth/authContext.jsx"
import RootLayout from "./layouts/rootLayout.jsx"
import ErrorPage from "./pages/errorPage.jsx"

import HomePage from "./pages/homePage.jsx"
import RegisterPage from "./pages/registerPage.jsx"
import LoginPage from "./pages/loginPage.jsx"
import ArticleCreationForm from "./pages/articleCreationForm.jsx"
import Dashboard from "./pages/dashboard.jsx"
import ProtectedRoute from "./components/protectedRoute.jsx"

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
        path: "/signup",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/create-article",
            element: <ArticleCreationForm />,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
