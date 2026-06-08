import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteButton({ docId, refresh }) {
  const [file, setFile] = useState(null);

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={async (e) => {
          e.stopPropagation();

          if (!window.confirm("Delete document?")) {
            return;
          }

          await API.delete(`/documents/${docId}`);

          refresh();
        }}
      >
        Delete
      </button>
    </div>
  );
}