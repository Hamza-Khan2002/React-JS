import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLink = ({ isActive }) =>
  `px-3 py-2 text-sm transition-colors ${
    isActive ? "text-gilt-400" : "text-paper-400 hover:text-paper-100"
  }`;

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-600 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-gilt-500/60 font-mono text-xs text-gilt-400">
            ▲
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-paper-50">
            Ledger
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={navLink}>
            Markets
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/portfolio" className={navLink}>
              Portfolio
            </NavLink>
          )}
          {isAuthenticated ? (
            <div className="ml-3 flex items-center gap-3 border-l border-ink-600 pl-3">
              <span className="font-mono text-xs text-paper-400">
                {user?.username}
              </span>
              <button
                onClick={handleSignOut}
                className="rounded border border-ink-600 px-3 py-1.5 text-sm text-paper-100 transition-colors hover:border-gilt-500 hover:text-gilt-400"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="ml-3 flex items-center gap-2 border-l border-ink-600 pl-3">
              <Link
                to="/login"
                className="rounded px-3 py-1.5 text-sm text-paper-100 transition-colors hover:text-gilt-400"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded bg-gilt-400 px-3 py-1.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gilt-300"
              >
                Get started
              </Link>
            </div>
          )}
        </nav>

        <button
          className="rounded border border-ink-600 p-2 text-paper-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="h-0.5 w-5 bg-current" />
          <div className="mt-1 h-0.5 w-5 bg-current" />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-600 bg-ink-950 px-4 pb-4 pt-2 md:hidden">
          <NavLink to="/" end className={navLink} onClick={() => setOpen(false)}>
            Markets
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/portfolio" className={navLink} onClick={() => setOpen(false)}>
              Portfolio
            </NavLink>
          )}
          <div className="mt-2 flex flex-col gap-2 border-t border-ink-600 pt-3">
            {isAuthenticated ? (
              <>
                <span className="font-mono text-xs text-paper-400">{user?.username}</span>
                <button
                  onClick={handleSignOut}
                  className="rounded border border-ink-600 px-3 py-2 text-left text-sm text-paper-100"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-paper-100">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded bg-gilt-400 px-3 py-2 text-center text-sm font-medium text-ink-950"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
