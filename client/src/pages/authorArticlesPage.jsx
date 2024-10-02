import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/articles/get`
      )
      setArticles(response.data)
    } catch (err) {
      console.error("Failed to fetch articles", err)
      setError("Failed to fetch articles. Please try again later.")
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.content}</p>
            <Link
              to={`/author_articles/edit/${article._id}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Edit Article
            </Link>
            <Link
              to={`/article/${article._id}`}
              className="inline-block px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Delete Article
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
