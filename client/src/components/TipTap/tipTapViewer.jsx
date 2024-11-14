import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import "highlight.js/styles/github-dark-dimmed.css"
import { useNavigate } from "react-router-dom"

const lowlight = createLowlight(common)

export default function TipTapViewer({ content, title, author, createdAt }) {
  const navigate = useNavigate()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight,
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: "language-",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-base max-w-none focus:outline-none p-4",
      },
    },
    content,
    editable: false,
  })

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.toLocaleDateString("en-US", { day: "2-digit" })
    const year = date.toLocaleDateString("en-US", { year: "2-digit" })
    return `${month} ${day} '${year}`
  }
  return (
    <article>
      <div className="p-4 border-b">
        <h1
          className="text-4xl font-bold mb-2 hover:text-blue-700 cursor-pointer"
          onClick={() => navigate("/article")}
        >
          {title}
        </h1>
        <div className="flex flex-col items-start gap-1 text-gray-600 text-sm">
          <span className="font-medium">{author.username}</span>

          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </div>
      </div>
      <EditorContent editor={editor} />
    </article>
  )
}
