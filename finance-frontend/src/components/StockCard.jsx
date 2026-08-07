import { Link } from "react-router-dom";
import { formatCurrency, formatCompactNumber } from "../lib/format";

export default function StockCard({ stock }) {
  return (
    <Link
      to={`/stock/${stock.id}`}
      className="group relative flex flex-col gap-4 rounded-lg border border-ink-600 bg-ink-800 p-5 transition-colors hover:border-gilt-500/60"
    >
      <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-lg bg-gilt-500/0 transition-colors group-hover:bg-gilt-500" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="ticker inline-block rounded border border-ink-600 px-2 py-0.5 text-xs font-semibold text-gilt-400">
            {stock.symbol}
          </span>
          <h3 className="mt-2 font-display text-base font-medium leading-snug text-paper-50 line-clamp-2">
            {stock.companyName}
          </h3>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-ink-600 pt-4 text-sm">
        <div>
          <p className="text-xs text-paper-400">Purchase</p>
          <p className="tabular font-mono text-paper-100">{formatCurrency(stock.purchase)}</p>
        </div>
        <div>
          <p className="text-xs text-paper-400">Last dividend</p>
          <p className="tabular font-mono text-gain">{formatCurrency(stock.lastDiv)}</p>
        </div>
        <div>
          <p className="text-xs text-paper-400">Industry</p>
          <p className="truncate text-paper-100">{stock.industry || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-paper-400">Market cap</p>
          <p className="tabular font-mono text-paper-100">${formatCompactNumber(stock.marketCap)}</p>
        </div>
      </div>
    </Link>
  );
}
