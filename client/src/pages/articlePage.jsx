import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function ArticlePage() {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()

  const fetchArticle = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/articles/get/${id}`
      )
      setArticle(response.data)
    } catch (err) {
      console.err("Failed to fetch article", err)
      setError("Failed to fetch the article. Please try again later.")
    }
  }

  useEffect(() => {
    fetchArticle()
  }, [id])

  return <div>articlePage</div>
}
