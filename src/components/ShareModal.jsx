import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
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
    <Popover className="relative">
      <PopoverButton className="btn-primary shrink-0">
        <ShareIcon className="h-4 w-4" />
        Share
      </PopoverButton>

      <PopoverPanel className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
        <h3 className="text-sm font-medium text-ink">Share document</h3>
        <p className="mt-0.5 text-xs text-ink-muted">Invite someone by email</p>

        <form onSubmit={shareDocument} className="mt-4 space-y-3">
          <div>
            <label htmlFor="share-email" className="mb-1 block text-xs font-medium text-ink-muted">
              Email address
            </label>
            <input
              id="share-email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input py-2"
            />
          </div>

          <div>
            <label htmlFor="share-permission" className="mb-1 block text-xs font-medium text-ink-muted">
              Permission
            </label>
            <select
              id="share-permission"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="input py-2"
            >
              <option value="read">Can view</option>
              <option value="edit">Can edit</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Sharing…' : 'Share'}
          </button>
        </form>

        {message && (
          <p className={`mt-3 text-xs ${error ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </PopoverPanel>
    </Popover>
  );
}
