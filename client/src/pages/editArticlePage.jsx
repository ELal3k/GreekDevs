import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
export default function EditArticlePage() {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()

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

  console.log(article.content)
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="prose max-w-none">{article.content}</div>
    </div>
  )
}
