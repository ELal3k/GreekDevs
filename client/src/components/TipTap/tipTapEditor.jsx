import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import "highlight.js/styles/github-dark-dimmed.css"

import MenuBar from "./menuBar"

const lowlight = createLowlight(common)

export default function TipTapEditor({ onUpdate }) {
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

    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onUpdate?.(html)
    },
  })

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 mt-10">
      <div className="border rounded-lg">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="bg-white" />
      </div>
    </div>
  )
}
