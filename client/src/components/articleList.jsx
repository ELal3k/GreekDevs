import { useEffect, useState } from "react"
import axios from "axios"
export default function ArticleList() {
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

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p>No Articles found</p>
      ) : (
        <ul>
          {articles.map((article) => {
            return <li key={article._id}>{article.title}</li>
          })}
        </ul>
      )}
    </div>
  )
}
