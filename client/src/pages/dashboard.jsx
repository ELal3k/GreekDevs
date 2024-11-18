import { useEffect } from "react"
import { useAuth } from "../auth/useAuth"
import { NavLink, useNavigate } from "react-router-dom"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import DashboardArticleCard from "../components/UI/dashboardArticleCard"

export default function Dashboard() {
  const { user } = useAuth()
  const { response: articles, isLoading, isInitialized, fetchData } = useApi()

  const navigate = useNavigate()

  useEffect(() => {
    const getAuthorArticles = async () => {
      if (user?._id) {
        fetchData({
          url: `/articles/author/${user?._id}`,
          method: "GET",
        })
      }
    }

    getAuthorArticles()
  }, [user?._id])

  const handleDelete = async (id) => {
    try {
      await fetchData({
        url: `/articles/delete/${id}`,
        method: "DELETE",
      })

      await fetchData({
        url: `/articles/author/${user?._id}`,
        method: "GET",
      })
    } catch (err) {
      console.log("Error deleting article:", err)
    }
  }

  if (!isInitialized || (isLoading && !articles)) {
    return <LoadingSpinner />
  }
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <h2 className="text-xl font-bold">Posts</h2>
      {!articles || articles.length === 0 ? (
        <div className="bg-slate-200 flex flex-col items-center justify-center shadow-md p-4">
          <p className="flex items-center text-3xl font-semibold ">
            You have no posts yet...
          </p>
          <p className="flex items-center text-3xl font-semibold ">
            Maybe
            <span>
              <NavLink
                to="/create-article"
                className=" px-2 text-blue-600 underline underline-offset-1 decoration-2"
              >
                Create
              </NavLink>
            </span>
            one?
          </p>
        </div>
      ) : (
        articles?.map((article) => (
          <DashboardArticleCard
            title={article.title}
            key={article._id}
            onDelete={() => handleDelete(article._id)}
            onEdit={() => navigate(`/edit-article/${article._id}`)}
          />
        ))
      )}
    </div>
  )
}
