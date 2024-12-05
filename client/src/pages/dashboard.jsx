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

  const getAuthorArticles = async () => {
    if (user?._id) {
      console.log("1.Fetching articles for author:", user._id) //----1----
      const res = await fetchData({
        url: `/articles/author/${user?._id}`,
        method: "GET",
      })
      console.log("2.Initial articles fetch result :", res) //----2----
    }
  }

  useEffect(() => {
    getAuthorArticles()
  }, [user?._id])

  const handleDelete = async (id) => {
    try {
      console.log("3. Starting delete operation for article:", id) //----3----

      const deleteRes = await fetchData({
        url: `/articles/delete/${id}`,
        method: "DELETE",
      })
      console.log("4. Delete operation result:", deleteRes) //----4----
      if (deleteRes.success) {
        await getAuthorArticles()
        console.log("5. GETARTICLES AFTER DELETE IS SUCCESS")
      }

      console.log("6. Current articles state:", articles) //----6----
    } catch (err) {
      console.log("7. Error deleting article:", err) //----7----
    }
  }

  console.log("8. Rendering with articles:", articles) //----8----

  if (!isInitialized || (isLoading && !articles)) {
    return <LoadingSpinner />
  }

  const articlesArray = Array.isArray(articles) ? articles : []

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
        articlesArray?.map((article) => (
          <DashboardArticleCard
            title={article?.title}
            key={article?._id}
            onDelete={() => handleDelete(article?._id)}
            onEdit={() => navigate(`/edit-article/${article?._id}`)}
          />
        ))
      )}
    </div>
  )
}
