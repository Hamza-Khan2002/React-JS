import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as api from "../lib/api";
import { formatDate } from "../lib/format";

export default function CommentSection({ symbol, comments, onChanged }) {
  const { isAuthenticated, user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ title: "", content: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.createComment(symbol, { title, content });
      setTitle("");
      setContent("");
      onChanged();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditDraft({ title: c.title, content: c.content });
  };

  const saveEdit = async (id) => {
    try {
      await api.updateComment(id, editDraft);
      setEditingId(null);
      onChanged();
    } catch {
      setError("Could not update comment.");
    }
  };

  const remove = async (id) => {
    try {
      await api.deleteComment(id);
      onChanged();
    } catch {
      setError("Could not delete comment.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold text-paper-50">
        Discussion <span className="text-paper-400">({comments.length})</span>
      </h2>

      {isAuthenticated ? (
        <form onSubmit={submit} className="space-y-3 rounded-lg border border-ink-600 bg-ink-800 p-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
            placeholder="Title (max 20 chars)"
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-paper-100 placeholder:text-paper-400 focus:border-gilt-500 focus:outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Share your take on this stock… (max 200 chars)"
            className="w-full resize-none rounded border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-paper-100 placeholder:text-paper-400 focus:border-gilt-500 focus:outline-none"
          />
          {error && <p className="text-sm text-loss">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-gilt-400 px-4 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-gilt-300 disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </form>
      ) : (
        <p className="rounded-lg border border-dashed border-ink-600 p-4 text-sm text-paper-400">
          Sign in to join the discussion.
        </p>
      )}

      <ul className="space-y-3">
        {comments.length === 0 && (
          <li className="text-sm text-paper-400">No comments yet — be the first to weigh in.</li>
        )}
        {comments.map((c) => (
          <li key={c.id} className="rounded-lg border border-ink-600 bg-ink-800 p-4">
            {editingId === c.id ? (
              <div className="space-y-2">
                <input
                  value={editDraft.title}
                  maxLength={20}
                  onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                  className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
                />
                <textarea
                  value={editDraft.content}
                  maxLength={200}
                  rows={2}
                  onChange={(e) => setEditDraft((d) => ({ ...d, content: e.target.value }))}
                  className="w-full resize-none rounded border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(c.id)}
                    className="rounded bg-gilt-400 px-3 py-1 text-xs font-medium text-ink-950"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded border border-ink-600 px-3 py-1 text-xs text-paper-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-paper-50">{c.title}</p>
                  <span className="whitespace-nowrap font-mono text-xs text-paper-400">
                    {formatDate(c.createdOn)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-paper-400">{c.content}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-gilt-400">@{c.createdBy}</span>
                  {user?.username === c.createdBy && (
                    <div className="flex gap-3 text-xs">
                      <button onClick={() => startEdit(c)} className="text-paper-400 hover:text-paper-100">
                        Edit
                      </button>
                      <button onClick={() => remove(c.id)} className="text-paper-400 hover:text-loss">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
