import { useRef, useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function UploadButton({ refreshDocuments }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/upload/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (refreshDocuments) refreshDocuments();
      navigate(`/documents/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.md,.docx"
        onChange={(e) => setFile(e.target.files[0] || null)}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="btn-secondary"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        {file ? file.name : 'Import file'}
      </button>
      {file && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Uploading…' : 'Upload'}
        </button>
      )}
    </div>
  );
}
