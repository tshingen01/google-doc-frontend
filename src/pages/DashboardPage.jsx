import { useNavigate } from 'react-router-dom';
import {
  DocumentTextIcon,
  UsersIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import useDocuments from '../hooks/useDocuments';
import UploadButton from '../components/UploadButton';
import DeleteButton from '../components/DeleteButton';
import NewDocumentButton from '../components/NewDocumentButton';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function DocumentCard({ doc, onOpen, actions }) {
  return (
    <div
      onClick={onOpen}
      className="group card cursor-pointer p-4 transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <DocumentTextIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-ink group-hover:text-brand-600">
            {doc.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
            <ClockIcon className="h-3.5 w-3.5" />
            Updated {formatDate(doc.updatedAt)}
          </p>
        </div>
        {actions}
      </div>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <DocumentTextIcon className="h-10 w-10 text-gray-300" />
      <p className="mt-3 font-medium text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { documents, refreshDocuments } = useDocuments();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <header className="page-header">
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">Create a new document or pick up where you left off.</p>
      </header>

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <NewDocumentButton refreshDocuments={refreshDocuments} />
        <UploadButton refreshDocuments={refreshDocuments} />
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-ink-muted" />
          <h2 className="text-lg font-medium text-ink">My documents</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-ink-muted">
            {documents.ownedDocuments.length}
          </span>
        </div>

        {documents.ownedDocuments.length === 0 ? (
          <EmptyState
            title="No documents yet"
            description="Create your first document or import a .txt, .md, or .docx file to get started."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.ownedDocuments.map((doc) => (
              <DocumentCard
                key={doc._id}
                doc={doc}
                onOpen={() => navigate(`/documents/${doc._id}`)}
                actions={
                  <DeleteButton docId={doc._id} refresh={refreshDocuments} />
                }
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-ink-muted" />
          <h2 className="text-lg font-medium text-ink">Shared with me</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-ink-muted">
            {documents.sharedDocuments.length}
          </span>
        </div>

        {documents.sharedDocuments.length === 0 ? (
          <EmptyState
            title="Nothing shared yet"
            description="Documents other people share with you will appear here."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.sharedDocuments.map((doc) => (
              <DocumentCard
                key={doc._id}
                doc={doc}
                onOpen={() => navigate(`/documents/${doc._id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
