import { useNavigate } from 'react-router-dom';
import useDocuments from '../hooks/useDocuments';
import UploadButton from '../components/UploadButton';
import DeleteButton from '../components/DeleteButton';
import NewDocumentButton from '../components/NewDocumentButton';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { documents, refreshDocuments } = useDocuments();

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <NewDocumentButton refreshDocuments={refreshDocuments} />
        <UploadButton refreshDocuments={refreshDocuments} />
      </div>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">My Documents</h2>
        <ul className="border rounded divide-y">
          {documents.ownedDocuments.map((doc) => (
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
          {documents.sharedDocuments.map((doc) => (
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
