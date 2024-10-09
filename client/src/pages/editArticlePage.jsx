import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import TurndownService from "turndown"
import MarkdownIt from "markdown-it"
import { modules, formats } from "../utils/quilConfig"

export default function EditArticlePage() {
  const [article, setArticle] = useState({ title: "", content: "" })
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const turndownService = useMemo(() => new TurndownService(), [])
  const md = useMemo(() => new MarkdownIt(), [])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/articles/get/${id}`
        )
        const htmlContent = md.render(response.data.content)

        setArticle({ ...response.data, content: htmlContent })
        setError(null)
      } catch (err) {
        console.error("Failed to fetch article", err)
        setError("Failed to fetch the article. Please try again later.")
      }
    }

    fetchArticle()
  }, [id, md])

  const handleTitleChange = (e) => {
    setArticle((prev) => ({ ...prev, title: e.target.value }))
  }

  const handleContentChange = (content) => {
    setArticle((prev) => ({ ...prev, content }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const markdownContent = turndownService.turndown(article.content)
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/articles/update/${id}`,
        { ...article, content: markdownContent }
      )
      navigate("/author_articles")
    } catch (err) {
      console.error("Failed to update article", err)
      setError("Failed to update the article. Please try again.")
    }
  }

  if (error) {
    return <div className="text-center  text-red-500">{error}</div>
  }

  if (!article) {
    return <div className="text-center ">Article not found.</div>
  }

  console.log(article.content)
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={article.title}
            onChange={handleTitleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1 font-semibold">
            Content:
          </label>
          <ReactQuill
            theme="snow"
            value={article.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="h-64 mb-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-6">
          <button
            type="button"
            onClick={() => navigate("/author_articles")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  )
}
