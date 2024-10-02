import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

export default function ArticlePage() {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/articles/get/${id}`
        )
        setArticle(response.data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch article", err)
        setError("Failed to fetch the article. Please try again later.")
      }
    }

    fetchArticle()
  }, [id])

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>
  }

  if (!article) {
    return <div className="text-center mt-10">Article not found.</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">
        Created at:{" "}
        {new Date(article.createdAt).toLocaleDateString(undefined, dateOptions)}
      </p>
      {article.updatedAt && (
        <p className="text-gray-600 mb-4">
          Last updated:{" "}
          {new Date(article.updatedAt).toLocaleDateString(
            undefined,
            dateOptions
          )}
        </p>
      )}
      <div className="prose max-w-none">
        {article.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      <Link to="/" className="mt-6 inline-block text-blue-500 hover:underline">
        ← Back to articles
      </Link>
    </div>
  )
}
