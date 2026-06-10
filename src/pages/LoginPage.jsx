import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-brand-500 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <DocumentTextIcon className="h-6 w-6" />
          </div>
          <span className="text-xl font-medium">Docs</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-normal leading-tight">
            Write, edit, and share documents together.
          </h2>
          <p className="mt-4 text-base text-blue-100">
            A clean collaborative editor with rich text formatting, file imports, and sharing.
          </p>
        </div>

        <p className="text-sm text-blue-100/80">Google Doc Clone</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
                <DocumentTextIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-medium text-ink">Docs</span>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-normal text-ink">Sign in</h2>
            <p className="mt-1 text-sm text-ink-muted">Use your account to continue</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 rounded-lg bg-surface-muted px-4 py-3 text-xs text-ink-muted">
              <p className="font-medium text-ink">Demo accounts</p>
              <p className="mt-1">john@test.com / 123456</p>
              <p>jane@test.com / 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
