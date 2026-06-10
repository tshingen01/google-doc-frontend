import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { ArrowLeftIcon, CloudArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline';
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
  const [saveStatus, setSaveStatus] = useState('idle');
  const documentRef = useRef(document);

  useEffect(() => {
    documentRef.current = document;
  }, [document]);

  const autoSave = useMemo(
    () =>
      debounce(async (title, html) => {
        setSaveStatus('saving');
        try {
          await API.put(`/documents/${id}`, { title, content: html });
          setSaveStatus('saved');
        } catch {
          setSaveStatus('error');
        }
      }, 1500),
    [id]
  );

  useEffect(() => {
    return () => autoSave.cancel();
  }, [autoSave]);

  useEffect(() => {
    if (saveStatus !== 'saved') return;
    const timer = setTimeout(() => setSaveStatus('idle'), 2000);
    return () => clearTimeout(timer);
  }, [saveStatus]);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap outline-none',
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
    setSaveStatus('saving');
    try {
      const html = editor.getHTML();
      await API.put(`/documents/${id}`, {
        title: document.title,
        content: html,
      });
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setDocument((prev) => ({ ...prev, title }));
    if (editor) {
      autoSave(title, editor.getHTML());
    }
  };

  if (!document) {
    return (
      <div className="flex h-full items-center justify-center bg-[#e8eaed]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <p className="text-sm text-ink-muted">Loading document…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#e8eaed]">
      <header className="shrink-0 border-b border-gray-200 bg-white shadow-toolbar">
        <div className="flex items-center gap-4 px-4 py-3 md:px-6">
          <Link
            to="/dashboard"
            className="btn-ghost shrink-0 px-2 py-2"
            title="Back to dashboard"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>

          <input
            className="min-w-0 flex-1 border-none bg-transparent text-lg font-normal text-ink outline-none placeholder:text-ink-faint"
            value={document.title}
            onChange={handleTitleChange}
            placeholder="Untitled document"
          />

          <div className="flex shrink-0 items-center gap-2">
            <SaveStatus status={saveStatus} />
            <button onClick={saveDocument} className="btn-secondary hidden sm:inline-flex">
              Save
            </button>
            <ShareModal documentId={id} />
          </div>
        </div>

        <EditorToolbar editor={editor} />
      </header>

      <div className="editor-scroll">
        <div className="editor-scroll-inner">
          <div className="doc-paper">
            <EditorContent editor={editor} className="h-full min-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveStatus({ status }) {
  if (status === 'saving') {
    return (
      <span className="flex items-center gap-1.5 text-xs text-ink-muted">
        <CloudArrowUpIcon className="h-4 w-4 animate-pulse" />
        Saving…
      </span>
    );
  }

  if (status === 'saved') {
    return (
      <span className="flex items-center gap-1.5 text-xs text-green-600">
        <CheckIcon className="h-4 w-4" />
        Saved
      </span>
    );
  }

  if (status === 'error') {
    return <span className="text-xs text-red-600">Save failed</span>;
  }

  return (
    <span className="hidden text-xs text-ink-faint sm:inline">Auto-save on</span>
  );
}
