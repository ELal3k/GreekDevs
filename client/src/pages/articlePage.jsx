import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function ArticlePage() {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()

  const fetchArticle = async () => {
    try {
    } catch (err) {
      const response = await axios.get()
      console.error("Failed to fetch article", err)
      setError("Failed to fetch article.Please try again later...")
    }
  }

  return <div>articlePage</div>
}
