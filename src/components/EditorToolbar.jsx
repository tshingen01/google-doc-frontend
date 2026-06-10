import { useEditorState } from '@tiptap/react';

function ToolbarButton({ active, onClick, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm transition ${
        active
          ? 'bg-brand-100 text-brand-700'
          : 'text-ink-muted hover:bg-gray-100 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-6 w-px bg-gray-200" />;
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
    <div className="flex flex-wrap items-center gap-0.5 border-t border-gray-100 px-4 py-2 md:px-6">
      <ToolbarButton
        active={state.isBold}
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>

      <ToolbarButton
        active={state.isItalic}
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>

      <ToolbarButton
        active={state.isUnderline}
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        active={state.isH1}
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        active={state.isBulletList}
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </ToolbarButton>

      <ToolbarButton
        active={state.isOrderedList}
        title="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </ToolbarButton>
    </div>
  );
}
