import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import "highlight.js/styles/github-dark-dimmed.css"

const lowlight = createLowlight(common)

export default function TipTapViewer({ content }) {
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
  return <EditorContent editor={editor} />
}
