import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function CreateArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/articles/post`, {
        title,
        content,
      })

      navigate("/")
    } catch (err) {
      console.error("Failed to create article", err)
      setError("Failed to create article. Please try again.")
    }
  }
  return (
    <div className="max-w-lg mx-auto mt-10 border-black border-[1px]">
      <h1 className=" text-2xl font-bold mb-5">Create New Article</h1>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          ></input>
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">
            content:
          </label>
          <textarea
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows="10"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Article
        </button>
      </form>
    </div>
  )
}
