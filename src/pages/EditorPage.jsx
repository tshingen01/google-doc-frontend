import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import API from '../api/axios';
import EditorToolbar from '../components/EditorToolbar';
import ShareModal from '../components/ShareModal';
import debounce from 'lodash.debounce';

function normalizeContent(content) {
  return typeof content === 'string' ? content : '';
}

export default function EditorPage() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const documentRef = useRef(document);

  useEffect(() => {
    documentRef.current = document;
  }, [document]);

  const autoSave = useMemo(
    () =>
      debounce(async (title, html) => {
        await API.put(`/documents/${id}`, { title, content: html });
      }, 1500),
    [id]
  );

  useEffect(() => {
    return () => autoSave.cancel();
  }, [autoSave]);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap min-h-[480px] outline-none',
      },
    },
    onUpdate({ editor }) {
      const current = documentRef.current;
      if (!current) return;
      autoSave(current.title, editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const fetchDocument = async () => {
      const res = await API.get(`/documents/${id}`);
      setDocument(res.data);
      editor.commands.setContent(normalizeContent(res.data.content), {
        emitUpdate: false,
      });
    };

    fetchDocument();
  }, [id, editor]);

  const saveDocument = async () => {
    if (!editor || !document) return;
    autoSave.cancel();
    const html = editor.getHTML();
    await API.put(`/documents/${id}`, {
      title: document.title,
      content: html,
    });
    alert('Document saved!');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setDocument((prev) => ({ ...prev, title }));
    if (editor) {
      autoSave(title, editor.getHTML());
    }
  };

  if (!document) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border p-2 w-full rounded text-lg font-semibold"
        value={document.title}
        onChange={handleTitleChange}
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
