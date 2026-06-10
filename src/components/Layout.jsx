import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">My Docs</h1>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:bg-gray-200 p-2 rounded">
            Dashboard
          </Link>
        </nav>
        <button
          onClick={logout}
          className="mt-auto bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
