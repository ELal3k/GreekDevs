import { useState } from "react"
import TipTapEditor from "../components/TipTap/tiptapEditor"
import useApi from "../hooks/useApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"

export default function ArticleCreationForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(null)
  const { fetchData, isLoading } = useApi()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Title is required")
      return
    }

    if (!content) {
      toast.error("Some content is required")
      return
    }

    try {
      const res = await fetchData({
        url: "/articles/post",
        method: "POST",
        data: {
          title: title.trim(),
          content,
        },
      })

      if (res) {
        toast.success("Article created successfully!", {
          autoClose: 1500,
          onClose: () => navigate("/"),
        })
      }
    } catch (err) {
      console.log("Error creating article", err)
      toast.error(err.response?.data?.message || "Failed to create article")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter article title"
            disabled={isLoading}
          />
        </div>
        <TipTapEditor
          onUpdate={(newContent) => {
            setContent(newContent)
          }}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Article
        </button>
      </div>
    </form>
  )
}
