import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function NewDocumentButton({ refreshDocuments }) {
  const navigate = useNavigate();

  const createDocument = async () => {
    try {
      const res = await API.post('/documents', {
        title: 'Untitled Document',
        content: '',
      });

      if (refreshDocuments) refreshDocuments();
      navigate(`/documents/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create document');
    }
  };

  return (
    <button onClick={createDocument} className="btn-primary">
      <PlusIcon className="h-5 w-5" />
      New document
    </button>
  );
}
