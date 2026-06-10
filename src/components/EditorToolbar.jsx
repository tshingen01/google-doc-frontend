import { useEditorState } from '@tiptap/react';

function ToolbarButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`px-2 py-1 border rounded ${active ? 'bg-gray-300' : 'bg-white hover:bg-gray-50'}`}
    >
      {children}
    </button>
  );
}

export default function EditorToolbar({ editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) {
        return {
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isH1: false,
          isBulletList: false,
          isOrderedList: false,
        };
      }

      return {
        isBold: ed.isActive('bold'),
        isItalic: ed.isActive('italic'),
        isUnderline: ed.isActive('underline'),
        isH1: ed.isActive('heading', { level: 1 }),
        isBulletList: ed.isActive('bulletList'),
        isOrderedList: ed.isActive('orderedList'),
      };
    },
  });

  if (!editor || !state) return null;

  return (
    <div className="flex gap-2 mb-2">
      <ToolbarButton
        active={state.isBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>

      <ToolbarButton
        active={state.isItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>

      <ToolbarButton
        active={state.isUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <ToolbarButton
        active={state.isH1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>

      <ToolbarButton
        active={state.isBulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </ToolbarButton>

      <ToolbarButton
        active={state.isOrderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </ToolbarButton>
    </div>
  );
}
