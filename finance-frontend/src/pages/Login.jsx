import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn, authError, authLoading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signIn(form);
    if (ok) navigate(location.state?.from?.pathname || "/", { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-md flex-col justify-center px-4 py-16">
      <div className="mb-8 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gilt-400">Ledger</span>
        <h1 className="mt-2 font-display text-2xl font-semibold text-paper-50">Welcome back</h1>
        <p className="mt-1 text-sm text-paper-400">Sign in to manage your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-ink-600 bg-ink-800 p-6">
        <div>
          <label className="mb-1 block text-xs text-paper-400">Username</label>
          <input
            required
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
            placeholder="hamza_dev"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-paper-400">Password</label>
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {authError && (
          <p className="rounded border border-loss/30 bg-loss/10 px-3 py-2 text-sm text-loss">{authError}</p>
        )}

        <button
          type="submit"
          disabled={authLoading}
          className="w-full rounded bg-gilt-400 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gilt-300 disabled:opacity-50"
        >
          {authLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-paper-400">
        Don't have an account?{" "}
        <Link to="/register" className="text-gilt-400 hover:text-gilt-300">
          Create one
        </Link>
      </p>
    </div>
  );
}
