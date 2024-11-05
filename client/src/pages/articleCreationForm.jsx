import { useState } from "react"
import TipTapEditor from "../components/TipTap/tiptapEditor"
export default function ArticleCreationForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(null)

  const handleEditorUpdate = (newContent) => {
    setContent(newContent)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Article Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter article title"
          />
        </div>
        <TipTapEditor onUpdate={handleEditorUpdate} />
      </div>
    </div>
  )
}
