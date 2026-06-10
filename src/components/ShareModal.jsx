import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';

export default function ShareModal({ documentId }) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('read');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const shareDocument = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage('');
    setError(false);

    try {
      await API.post(`/documents/${documentId}/share`, { email, permission });
      setMessage('Document shared successfully');
      setEmail('');
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || 'Error sharing document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[816px]">
      <div className="card p-4">
        <div className="mb-3 flex items-center gap-2">
          <ShareIcon className="h-5 w-5 text-brand-500" />
          <h3 className="text-sm font-medium text-ink">Share document</h3>
        </div>

        <form onSubmit={shareDocument} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="share-email" className="mb-1.5 block text-xs font-medium text-ink-muted">
              Email address
            </label>
            <input
              id="share-email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>

          <div className="sm:w-36">
            <label htmlFor="share-permission" className="mb-1.5 block text-xs font-medium text-ink-muted">
              Permission
            </label>
            <select
              id="share-permission"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="input"
            >
              <option value="read">Can view</option>
              <option value="edit">Can edit</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn-primary shrink-0">
            {loading ? 'Sharing…' : 'Share'}
          </button>
        </form>

        {message && (
          <p className={`mt-3 text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
