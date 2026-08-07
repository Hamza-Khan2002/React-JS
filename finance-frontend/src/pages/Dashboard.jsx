import { useEffect, useState } from "react";
import * as api from "../lib/api";
import StockCard from "../components/StockCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const PAGE_SIZE = 6;

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [symbol, setSymbol] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [sortBy, setSortBy] = useState("purchase");
  const [isDescending, setIsDescending] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    api
      .getStocks({
        symbol: symbol || undefined,
        companyName: companyName || undefined,
        sortBy,
        isDescending,
        pageNumber: page,
        pageSize: PAGE_SIZE,
      })
      .then((res) => {
        if (!ignore) setStocks(res.data);
      })
      .catch(() => {
        if (!ignore) setError("Could not load stocks. Is the API reachable?");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [symbol, companyName, sortBy, isDescending, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSymbol(e.target.symbol.value.trim());
    setCompanyName(e.target.companyName.value.trim());
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gilt-400">Markets</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-paper-50">Browse stocks</h1>
        <p className="mt-1 text-sm text-paper-400">
          Search by symbol or company, sort by the fundamentals that matter.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col gap-3 rounded-lg border border-ink-600 bg-ink-800 p-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-xs text-paper-400">Symbol</label>
          <input
            name="symbol"
            defaultValue={symbol}
            placeholder="e.g. AAPL"
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-paper-100 placeholder:text-paper-500 focus:border-gilt-500 focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-paper-400">Company name</label>
          <input
            name="companyName"
            defaultValue={companyName}
            placeholder="e.g. Apple"
            className="w-full rounded border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-paper-100 placeholder:text-paper-500 focus:border-gilt-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-paper-400">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-paper-100 focus:border-gilt-500 focus:outline-none"
          >
            <option value="symbol">Symbol</option>
            <option value="purchase">Purchase price</option>
            <option value="lastdiv">Dividend</option>
            <option value="marketcap">Market cap</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => setIsDescending((v) => !v)}
          className="rounded border border-ink-600 px-3 py-2 text-sm text-paper-100 hover:border-gilt-500 hover:text-gilt-400"
          title="Toggle direction"
        >
          {isDescending ? "↓ Desc" : "↑ Asc"}
        </button>
        <button
          type="submit"
          className="rounded bg-gilt-400 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-gilt-300"
        >
          Search
        </button>
      </form>

      {loading && <Loader label="Fetching stocks" />}
      {error && <p className="rounded border border-loss/30 bg-loss/10 p-4 text-sm text-loss">{error}</p>}

      {!loading && !error && (
        <>
          {stocks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-ink-600 p-10 text-center text-paper-400">
              No stocks matched your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stocks.map((s) => (
                <StockCard key={s.id} stock={s} />
              ))}
            </div>
          )}
          <Pagination page={page} hasNext={stocks.length === PAGE_SIZE} onChange={setPage} />
        </>
      )}
    </div>
  );
}
