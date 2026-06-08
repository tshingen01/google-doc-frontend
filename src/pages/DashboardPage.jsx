import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import useDocuments from '../hooks/useDocuments';
import UploadButton from '../components/UploadButton';
import { useAuth } from "../context/AuthContext";
import DeleteButton from '../components/DeleteButton';
import NewDocumentButton from '../components/NewDocumentButton';

export default function DashboardPage() {
  const [docs, setDocs] = useState({ ownedDocuments: [], sharedDocuments: [] });
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    documents,
    refreshDocuments,
  } = useDocuments();
  const createDocument = async () => {
    try {
      const res = await API.post("/documents", {
        title: "Untitled Document",
      });

      navigate(`/documents/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDocuments = async () => {
    const res = await API.get('/documents');
    setDocs(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <NewDocumentButton refreshDocuments={refreshDocuments} />
        <UploadButton refreshDocuments={refreshDocuments} />
      </div>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">My Documents</h2>
        <ul className="border rounded divide-y">
          {documents.ownedDocuments.map(doc => (
            <li
              key={doc._id}
              className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
              onClick={() => navigate(`/documents/${doc._id}`)}
            >
              {doc.title}
              <DeleteButton docId={doc._id} refresh={refreshDocuments} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Shared With Me</h2>
        <ul className="border rounded divide-y">
          {documents.sharedDocuments.map(doc => (
            <li
              key={doc._id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/documents/${doc._id}`)}
            >
              {doc.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}