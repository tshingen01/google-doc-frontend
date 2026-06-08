import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function UploadButton() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert('Select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/upload/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/documents/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
      >
        Upload
      </button>
    </div>
  );
}