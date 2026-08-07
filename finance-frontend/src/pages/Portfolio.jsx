import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../lib/api";
import Loader from "../components/Loader";
import { formatCurrency, formatCompactNumber } from "../lib/format";

export default function Portfolio() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api
      .getPortfolio()
      .then((res) => setHoldings(res.data))
      .catch(() => setError("Could not load your portfolio."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (companyName) => {
    setRemoving(companyName);
    try {
      await api.removeFromPortfolio(companyName);
      setHoldings((h) => h.filter((s) => s.companyName !== companyName));
    } catch {
      setError("Could not remove that stock.");
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gilt-400">Your holdings</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-paper-50">Portfolio</h1>
        <p className="mt-1 text-sm text-paper-400">Stocks you're tracking, in one place.</p>
      </div>

      {loading && <Loader label="Loading portfolio" />}
      {error && <p className="rounded border border-loss/30 bg-loss/10 p-4 text-sm text-loss">{error}</p>}

      {!loading && !error && holdings.length === 0 && (
        <div className="rounded-lg border border-dashed border-ink-600 p-10 text-center">
          <p className="text-paper-400">You haven't added any stocks yet.</p>
          <Link to="/" className="mt-3 inline-block text-sm text-gilt-400 hover:text-gilt-300">
            Browse markets →
          </Link>
        </div>
      )}

      {!loading && holdings.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-ink-600">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-800 text-xs uppercase tracking-wide text-paper-400">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Purchase</th>
                <th className="px-4 py-3">Dividend</th>
                <th className="px-4 py-3">Market cap</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {holdings.map((s) => (
                <tr key={s.id} className="border-t border-ink-600 bg-ink-900 hover:bg-ink-800">
                  <td className="px-4 py-3">
                    <Link to={`/stock/${s.id}`} className="ticker text-gilt-400 hover:text-gilt-300">
                      {s.symbol}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-paper-100">{s.companyName}</td>
                  <td className="tabular px-4 py-3 font-mono text-paper-100">{formatCurrency(s.purchase)}</td>
                  <td className="tabular px-4 py-3 font-mono text-gain">{formatCurrency(s.lastDiv)}</td>
                  <td className="tabular px-4 py-3 font-mono text-paper-100">
                    ${formatCompactNumber(s.marketCap)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(s.companyName)}
                      disabled={removing === s.companyName}
                      className="text-xs text-paper-400 hover:text-loss disabled:opacity-50"
                    >
                      {removing === s.companyName ? "Removing…" : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
