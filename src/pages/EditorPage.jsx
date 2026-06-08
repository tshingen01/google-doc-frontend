import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import API from '../api/axios';
import EditorToolbar from '../components/EditorToolbar';
import ShareModal from '../components/ShareModal';
import debounce from "lodash.debounce";

export default function EditorPage() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  const autoSave = debounce(async (html) => {
    await API.put(`/documents/${id}`, {
      title: document.title,
      content: html,
    });
  }, 1500);

  const editor = useEditor({
    extensions: [...[]],
    onUpdate({ editor }) {
      autoSave(editor.getHTML());
    },
  });

  useEffect(() => {
    const fetchDocument = async () => {
      const res = await API.get(`/documents/${id}`);
      setDocument(res.data);
      editor?.commands.setContent(res.data.content);
    };
    fetchDocument();
  }, [id, editor]);

  const saveDocument = async () => {
    if (!editor) return;
    const html = editor.getHTML();
    await API.put(`/documents/${id}`, {
      title: document.title,
      content: html,
    });
    alert('Document saved!');
  };

  if (!document) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border p-2 w-full rounded text-lg font-semibold"
        value={document.title}
        onChange={(e) => setDocument({ ...document, title: e.target.value })}
      />

      <EditorToolbar editor={editor} />

      <EditorContent editor={editor} className="border p-4 rounded min-h-[500px]" />

      <div className="flex gap-2">
        <button onClick={saveDocument} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Save
        </button>
        <ShareModal documentId={id} />
      </div>
      <p className="text-sm text-gray-500">Autosaves every 1.5 seconds</p>
    </div>
  );
}