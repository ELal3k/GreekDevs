import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import TipTapUpdater from "../components/TipTap/tipTapUpdater"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ArticleEditForm() {
  const { articleId } = useParams()
  const { response: article, isLoading, fetchData } = useApi()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState(article?.content)

  const navigate = useNavigate()

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await fetchData({
          url: `/articles/get/${articleId}`,
          method: "GET",
        })

        if (res) {
          setTitle(res?.title)
          setContent(res?.content)
        }
      } catch (err) {
        console.log("Failed to fetch article", err)
      }
    }

    getArticle()
  }, [articleId])

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
        url: `/articles/update/${articleId}`,
        method: "PUT",
        data: {
          title: title.trim(),
          content,
        },
      })

      if (res.success) {
        toast.success("Article updated successfully!", {
          autoClose: 1500,
          onClose: () => navigate("/dashboard"),
        })
      }
    } catch (err) {
      console.log("Error creating article", err)
      toast.error(err.response?.data?.message || "Failed to create article")
    }
  }

  if (!article && isLoading) return <LoadingSpinner />

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
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-4 shadow-md rounded-md focus:outline-none text-4xl font-extrabold text-gray-600 placeholder-gray-500"
          placeholder="Enter article title"
          disabled={isLoading}
        />
        <TipTapUpdater
          initialContent={article?.content}
          onUpdate={(newContent) => setContent(newContent)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update Article
        </button>
      </div>
    </form>
  )
}
