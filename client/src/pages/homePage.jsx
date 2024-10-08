import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import MarkdownIt from "markdown-it"
import DOMPurify from "dompurify"

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const md = new MarkdownIt()

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

  const renderContent = (content) => {
    // Convert Markdown to HTML
    const rawHtml = md.render(content)
    // Sanitize the HTML
    const cleanHtml = DOMPurify.sanitize(rawHtml)
    return { __html: cleanHtml }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <div
              className="prose prose-slate max-w-none mb-4"
              dangerouslySetInnerHTML={renderContent(
                article.content.slice(0, 200) + "..."
              )}
            />
            <Link
              to={`/article/${article._id}`}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
