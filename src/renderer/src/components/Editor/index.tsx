import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export type OnContentUpdatedParams = {
  title: string
  content: string
}

type EditorProps = {
  content: string
  onContentUpdated: (data: OnContentUpdatedParams) => void
}

export function Editor(props: EditorProps) {
  const { content, onContentUpdated } = props

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
      }),
      Document.extend({ content: 'heading block*' }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Sem Título',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+?)<\/h1>(?<content>.+)?)/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? 'Sem Título'
      const content = parsedContent?.content ?? ''

      onContentUpdated({ title, content })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor} />
}
