import API from '../api/axios';

export default function DeleteButton({ docId, refresh }) {
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();

        if (!window.confirm('Delete document?')) {
          return;
        }

        try {
          await API.delete(`/documents/${docId}`);
          refresh();
        } catch (err) {
          alert(err.response?.data?.message || 'Failed to delete document');
        }
      }}
      className="text-red-600 hover:text-red-800 px-2"
    >
      Delete
    </button>
  );
}
