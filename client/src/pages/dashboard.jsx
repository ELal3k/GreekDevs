import { useEffect } from "react"
import { useAuth } from "../auth/useAuth"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import DashboardArticleCard from "../components/UI/dashboardArticleCard"

export default function Dashboard() {
  const { user } = useAuth()
  const { response: articles, isLoading, fetchData } = useApi()

  useEffect(() => {
    if (user?._id) {
      fetchData({
        url: `/articles/author/${user?._id}`,
        method: "GET",
      })
    }
  }, [user?._id])

  if (!user) return <LoadingSpinner />
  if (isLoading) return <LoadingSpinner />

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
  console.log("ARTICLES", articles)
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <h2 className="text-xl font-bold">Posts</h2>
      {!articles || articles.length === 0 ? (
        <p>You have no posts yet...</p>
      ) : (
        articles?.map((article) => (
          <DashboardArticleCard
            title={article.title}
            key={article._id}
            onDelete={() => handleDelete(article._id)}
          />
        ))
      )}
    </div>
  )
}
