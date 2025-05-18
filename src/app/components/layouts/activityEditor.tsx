/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import CodeBlock from "@tiptap/extension-code-block"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, List, ListOrdered, Code, Heading1, Heading2, Heading3, Save } from "lucide-react"
import { Activity } from "./activityTracker"

interface ActivityEditorProps {
  activity?: Activity
  onSave: (activity: Activity) => void
}

export default function ActivityEditor({ activity, onSave }: ActivityEditorProps) {
  const [title, setTitle] = useState(activity?.title || "")
  const [category, setCategory] = useState<"development" | "bugfix" | "review">(activity?.category || "development")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write about your activity...",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
    ],
    content: activity?.content || "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  })

  useEffect(() => {
    if (editor && activity) {
      editor.commands.setContent(activity.content)
    }
  }, [editor, activity])

  const handleSave = () => {
    if (!editor) return

    const content = editor.getHTML()

    onSave({
      id: activity?.id || "",
      date: activity?.date || "",
      title,
      content,
      category,
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-4 border-b dark:border-gray-800">
        <Input
          placeholder="Activity title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium"
        />
        <Select value={category} onValueChange={(value) => setCategory(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="bugfix">Bug Fix</SelectItem>
            <SelectItem value="review">Review</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-b dark:border-gray-800 p-2 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor?.isActive("heading", { level: 1 }) ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive("heading", { level: 2 }) ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor?.isActive("heading", { level: 3 }) ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive("orderedList") ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={editor?.isActive("codeBlock") ? "bg-gray-200 dark:bg-gray-800" : ""}
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>

      <div className="p-4 border-t dark:border-gray-800 flex justify-end">
        <Button onClick={handleSave} disabled={!title.trim()}>
          <Save className="h-4 w-4 mr-2" /> Save Activity
        </Button>
      </div>
    </div>
  )
}
