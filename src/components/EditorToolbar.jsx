import { useEditor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  BulletList,
  OrderedList,
  Heading
} from '@heroicons/react/24/solid';

export default function EditorToolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="flex gap-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
      >
        B
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
      >
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
      >
        U
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
      >
        1. List
      </button>
    </div>
  );
}