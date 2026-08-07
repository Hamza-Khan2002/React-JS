import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { formatCurrency, formatCompactNumber } from "../lib/format";
import Loader from "../components/Loader";
import CommentSection from "../components/CommentSection";

export default function StockDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portfolioMsg, setPortfolioMsg] = useState(null);
  const [adding, setAdding] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .getStockById(id)
      .then((res) => setStock(res.data))
      .catch(() => setError("Stock not found."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const addToPortfolio = async () => {
    setAdding(true);
    setPortfolioMsg(null);
    try {
      await api.addToPortfolio(stock.symbol);
      setPortfolioMsg({ type: "success", text: "Added to your portfolio." });
    } catch (err) {
      setPortfolioMsg({
        type: "error",
        text: err?.response?.data?.message || "Could not add stock to portfolio.",
      });
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Loader label="Loading stock" />;
  if (error || !stock)
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-loss">{error}</p>
        <Link to="/" className="mt-4 inline-block text-sm text-gilt-400 hover:text-gilt-300">
          ← Back to markets
        </Link>
      </div>
    );

  const stats = [
    { label: "Purchase price", value: formatCurrency(stock.purchase) },
    { label: "Last dividend", value: formatCurrency(stock.lastDiv), accent: true },
    { label: "Market cap", value: `$${formatCompactNumber(stock.marketCap)}` },
    { label: "Industry", value: stock.industry || "—" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link to="/" className="text-sm text-paper-400 hover:text-gilt-400">
        ← Back to markets
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <span className="ticker inline-block rounded border border-ink-600 px-2 py-0.5 text-sm font-semibold text-gilt-400">
            {stock.symbol}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-paper-50">{stock.companyName}</h1>
        </div>

        {isAuthenticated && (
          <button
            onClick={addToPortfolio}
            disabled={adding}
            className="whitespace-nowrap rounded bg-gilt-400 px-4 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gilt-300 disabled:opacity-50"
          >
            {adding ? "Adding…" : "+ Add to portfolio"}
          </button>
        )}
      </div>

      {portfolioMsg && (
        <p
          className={`mt-3 rounded border px-3 py-2 text-sm ${
            portfolioMsg.type === "success"
              ? "border-gain/30 bg-gain/10 text-gain"
              : "border-loss/30 bg-loss/10 text-loss"
          }`}
        >
          {portfolioMsg.text}
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-ink-600 bg-ink-800 p-4">
            <p className="text-xs text-paper-400">{s.label}</p>
            <p className={`tabular mt-1 font-mono text-lg ${s.accent ? "text-gain" : "text-paper-50"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <CommentSection symbol={stock.symbol} comments={stock.comments || []} onChanged={load} />
      </div>
    </div>
  );
}
