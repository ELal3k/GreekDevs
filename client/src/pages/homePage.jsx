import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/articles/get`
        )
        console.log(res.data)
      } catch (err) {
        console.log(err)
        setError("Failed to fetch articles.Please try again later.")
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])
  return (
    <>
      {articles.length !== 0 ? <p>i have articles</p> : <div>OH so empty</div>}
    </>
  )
}
