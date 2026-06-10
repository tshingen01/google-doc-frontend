import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  DocumentTextIcon,
  Squares2X2Icon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isEditor = location.pathname.startsWith('/documents/');
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="flex h-screen overflow-hidden bg-surface-canvas">
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
            <DocumentTextIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-medium text-ink">Docs</h1>
            <p className="text-xs text-ink-muted">Collaborative editor</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          <Link
            to="/dashboard"
            className={`nav-link ${isDashboard ? 'nav-link-active' : ''}`}
          >
            <Squares2X2Icon className="h-5 w-5" />
            Dashboard
          </Link>
          {isEditor && (
            <div className="nav-link nav-link-active cursor-default">
              <DocumentTextIcon className="h-5 w-5" />
              Editor
            </div>
          )}
        </nav>

        <div className="mt-auto border-t border-gray-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-surface-muted px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-medium text-brand-700">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
              <p className="truncate text-xs text-ink-muted">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-ghost w-full justify-start">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
