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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/articles/delete/${id}`
        )
        // After successful deletion, refetch the articles to update the list
        fetchArticles()
      } catch (err) {
        console.error("Failed to delete article", err)
        setError("Failed to delete the article. Please try again.")
      }
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Articles</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
            <div
              className="prose prose-slate max-w-none mb-4"
              dangerouslySetInnerHTML={renderContent(article.content)}
            />
            <div className="flex space-x-4">
              <Link
                to={`/author_articles/edit/${article._id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Edit Article
              </Link>
              <button
                onClick={() => handleDelete(article._id)}
                className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete Article
              </button>
            </div>
          </div>
        ))}
      </div>
      {articles.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          You haven't created any articles yet.
        </p>
      )}
      <div className="mt-8 text-center">
        <Link
          to="/edit"
          className="inline-block px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Create New Article
        </Link>
      </div>
    </div>
  )
}
