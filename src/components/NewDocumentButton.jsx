import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewDocumentButton({ refreshDocuments }) {
  const navigate = useNavigate();

  const createDocument = async () => {
    try {
      const res = await API.post('/documents', {
        title: 'Untitled Document',
        content: '',
      });

      // Refresh dashboard document list
      if (refreshDocuments) refreshDocuments();

      // Navigate to editor
      navigate(`/documents/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create document');
    }
  };

  return (
    <button
      onClick={createDocument}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + New Document
    </button>
  );
}