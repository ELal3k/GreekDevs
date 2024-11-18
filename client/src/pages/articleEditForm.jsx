import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import TipTapUpdater from "../components/TipTap/tipTapUpdater"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ArticleEditForm() {
  const { articleId } = useParams()
  const { response: article, isLoading, fetchData } = useApi()

  const [title, setTitle] = useState("")

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await fetchData({
          url: `/articles/get/${articleId}`,
          method: "GET",
        })

        if (res) {
          setTitle(res?.title)
        }
      } catch (err) {
        console.log("Failed to fetch article", err)
      }
    }

    getArticle()
  }, [articleId])

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  if (isLoading) return <LoadingSpinner />

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
          className="w-full px-3 py-4 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-4xl font-extrabold text-gray-600"
          placeholder="Enter article title"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
