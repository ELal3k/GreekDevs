import axios from "axios"
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom"
import DOMPurify from "dompurify"
import { modules, formats } from "../utils/quillConfig"
import "highlight.js/styles/github.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ArticleCreationForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (value) => {
    setContent(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const sanitizedContent = DOMPurify.sanitize(content)

    try {
      const token = localStorage.getItem("token")

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/articles/post`,
        {
          title: title,
          content: sanitizedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(res)
    } catch (err) {
      err.response?.status === 401
        ? setError("You must be logged in to post an article")
        : setError("An error occurred while creating the article")
    }
  }
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create New Article</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
          />

          {error && <p className="text-red-500 text-sm mt-1 mb-4">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Create Article
        </button>
      </form>
    </div>
  )
}
