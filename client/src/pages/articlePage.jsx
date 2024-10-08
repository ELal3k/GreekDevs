import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import MarkdownIt from "markdown-it"
import DOMPurify from "dompurify"

export default function ArticlePage() {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()

  const md = new MarkdownIt()

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

  const renderContent = (content) => {
    // Convert Markdown to HTML
    const rawHtml = md.render(content)
    // Sanitize the HTML
    const cleanHtml = DOMPurify.sanitize(rawHtml)
    // Return an object for dangerouslySetInnerHTML
    return { __html: cleanHtml }
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>
  }

  if (!article) {
    return <div className="text-center mt-10">Article not found.</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
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
      <div
        className="prose prose-slate max-w-none mb-6"
        dangerouslySetInnerHTML={renderContent(article.content)}
      />
      <Link
        to="/"
        className="inline-block text-blue-500 hover:text-blue-600 font-medium"
      >
        ← Back to articles
      </Link>
    </div>
  )
}
