export default function Pagination({ page, hasNext, onChange }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded border border-ink-600 px-4 py-2 text-sm text-paper-100 transition-colors hover:border-gilt-500 hover:text-gilt-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        ← Prev
      </button>
      <span className="font-mono text-sm text-paper-400">Page {page}</span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={!hasNext}
        className="rounded border border-ink-600 px-4 py-2 text-sm text-paper-100 transition-colors hover:border-gilt-500 hover:text-gilt-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next →
      </button>
    </div>
  );
}
