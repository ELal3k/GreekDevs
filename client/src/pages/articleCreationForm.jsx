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
  const navigate = useNavigate()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (value) => {
    setContent(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sanitizedContent = DOMPurify.sanitize(content)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        toast.error("Please log in to create an article!")
      }

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

      if (res.data.success) {
        toast.success(res.data.message || "Article created successfully!")
        navigate("/dashboard")
      }
    } catch (err) {
      if (err.response?.data?.message === "Token expired") {
        toast.error(err.response.data.message)
      }
    }
  }
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
