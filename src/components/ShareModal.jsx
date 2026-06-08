import { useState } from 'react';
import API from '../api/axios';

export default function ShareModal({ documentId }) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('read');
  const [message, setMessage] = useState('');

  const shareDocument = async () => {
    try {
      await API.post(`/documents/${documentId}/share`, { email, permission });
      setMessage('Document shared successfully');
      setEmail('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sharing document');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        placeholder="Email to share"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="read">Read</option>
        <option value="edit">Edit</option>
      </select>
      <button
        onClick={shareDocument}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Share
      </button>
      {message && <span className="ml-2 text-green-600">{message}</span>}
    </div>
  );
}