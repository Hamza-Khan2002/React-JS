import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="ticker text-sm text-gilt-400">404</span>
      <h1 className="mt-2 font-display text-2xl font-semibold text-paper-50">Page not found</h1>
      <p className="mt-2 text-sm text-paper-400">That symbol isn't listed on this exchange.</p>
      <Link to="/" className="mt-6 rounded bg-gilt-400 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-gilt-300">
        Back to markets
      </Link>
    </div>
  );
}
