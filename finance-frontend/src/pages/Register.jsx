import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { signUp, authError, authLoading } = useAuth();
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signUp(form);
    if (ok) navigate("/", { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-md flex-col justify-center px-4 py-16">
      <div className="mb-8 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gilt-400">Ledger</span>
        <h1 className="mt-2 font-display text-2xl font-semibold text-paper-50">Create your account</h1>
        <p className="mt-1 text-sm text-paper-400">Track stocks, build a portfolio, join the discussion.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-ink-600 bg-ink-800 p-6">
        <div>
          <label className="mb-1 block text-xs text-paper-400">Username (max 15 chars)</label>
          <input
            required
            maxLength={15}
            value={form.userName}
            onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))}
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
            placeholder="hamza_dev"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-paper-400">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-paper-400">Password</label>
          <input
            required
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-paper-400">
            8+ chars, with an uppercase, lowercase, digit &amp; symbol.
          </p>
        </div>

        {authError && (
          <p className="rounded border border-loss/30 bg-loss/10 px-3 py-2 text-sm text-loss">{authError}</p>
        )}

        <button
          type="submit"
          disabled={authLoading}
          className="w-full rounded bg-gilt-400 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gilt-300 disabled:opacity-50"
        >
          {authLoading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-paper-400">
        Already have an account?{" "}
        <Link to="/login" className="text-gilt-400 hover:text-gilt-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}
