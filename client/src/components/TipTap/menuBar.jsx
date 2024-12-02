import {
  Bold,
  Quote,
  /**
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
 
  Minus,
  Undo,
  Redo,
  Eraser,
  Palette,
  Terminal,
  QuoteIcon,
   */
} from "lucide-react"

export default function MenuBar({ editor }) {
  if (!editor) return null
  return (
    <div className="sticky top-0 z-50 p-2 bg-white border-b flex flex-wrap gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 ${
          editor.isActive("blockquote") ? "bg-gray-200" : ""
        }`}
      >
        <Quote className="w-4 h-4" />
      </button>
    </div>
  )
}
