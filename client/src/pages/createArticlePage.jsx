import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import TurndownService from "turndown"
import { modules, formats } from "../utils/quilConfig"

export default function CreateArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const turndownService = new TurndownService()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const markdownContent = turndownService.turndown(content)

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/articles/post`, {
        title,
        content: markdownContent,
      })

      navigate("/")
    } catch (err) {
      console.error("Failed to create article", err)
      setError("Failed to create article. Please try again.")
    }
  }

  console.log(content)
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="h-64 mb-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Article
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
