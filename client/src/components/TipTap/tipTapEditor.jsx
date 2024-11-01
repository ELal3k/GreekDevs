import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function TipTapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
  })
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 mt-10">
      <div className="border rounded-lg">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
