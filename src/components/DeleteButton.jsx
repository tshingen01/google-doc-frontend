import { TrashIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';

export default function DeleteButton({ docId, refresh }) {
  return (
    <button
      type="button"
      onClick={async (e) => {
        e.stopPropagation();

        if (!window.confirm('Delete this document?')) {
          return;
        }

        try {
          await API.delete(`/documents/${docId}`);
          refresh();
        } catch (err) {
          alert(err.response?.data?.message || 'Failed to delete document');
        }
      }}
      className="rounded-lg p-2 text-ink-faint opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
      title="Delete document"
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}
