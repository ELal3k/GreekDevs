import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"

export default function AuthorArticlesPage() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/articles/get/${id}`
      )
      setArticles(response.data)
    } catch (err) {
      console.error("Failed to fetch articles", err)
      setError("Failed to fetch articles. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [id])

  const handleDelete = async (articleId) => {
    // Implement delete functionality here
    console.log(`Delete article with id: ${articleId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">My Articles</h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md relative h-64 flex flex-col"
          >
            <div className="p-6 flex-grow overflow-hidden">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-1">
                {article.title}
              </h2>
              <p className="text-gray-600 line-clamp-4">{article.content}</p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  to={`/edit-article/${article._id}`}
                  className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
