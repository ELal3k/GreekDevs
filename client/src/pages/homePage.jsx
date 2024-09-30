import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) {
      return content
    }
    return content.substring(0, maxLength) + "..."
  }

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

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">No Articles found</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600">
                {truncateContent(article.content)}
              </p>
              <Link to={`/article/${article._id}`}>Read More</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
