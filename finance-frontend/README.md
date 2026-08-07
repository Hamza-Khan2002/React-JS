# Ledger — Finance Project Frontend

React (Vite) frontend for the **FinanceProject** ASP.NET Core API — register/login,
browse & search stocks, view fundamentals (purchase price, dividend, industry, market cap),
comment on stocks, and manage a personal portfolio. Full JWT auth wired to your backend's
`api/account`, `api/stock`, `api/portfolio` and `api/comment` endpoints.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `VITE_API_URL` to your backend:

```
VITE_API_URL=http://managefinance.runasp.net/api
```

or, for local development against your own backend running via `dotnet run`:

```
VITE_API_URL=https://localhost:49500/api
```

> Note: if you point at a `https://localhost` backend with a self-signed dev cert,
> your browser may block requests until you open that URL directly once and accept the
> certificate warning.

## Run

```bash
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  lib/api.js            Axios instance, JWT interceptor, all API calls
  lib/format.js          Currency / number formatting helpers
  context/AuthContext.jsx  Auth state, login/register/logout
  components/            Navbar, ProtectedRoute, StockCard, Pagination, CommentSection, Loader
  pages/                  Dashboard (markets), StockDetail, Portfolio, Login, Register, NotFound
```

## Notes on the backend contract

- `POST /account/login` `{ username, password }` → `{ username, email, token }`
- `POST /account/register` `{ userName, email, password }` → `{ username, email, token }`
  (password needs 8+ chars, upper, lower, digit, symbol — matches Identity rules in `Program.cs`)
- `GET /stock?symbol=&companyName=&sortBy=&isDescending=&pageNumber=&pageSize=` (auth required)
- `GET /stock/{id}` (auth required)
- `GET /portfolio` / `POST /portfolio/{symbol}` / `DELETE /portfolio?companyName=` (auth required)
- `GET /comment?symbol=` / `POST /comment/{symbol}` / `PUT /comment/{id}` / `DELETE /comment/{id}`

The JWT is stored in `localStorage` and attached to every request automatically. A `401`
response anywhere signs the user out and redirects to `/login`.

## Design

Dark "trading ledger" theme — charcoal-navy surfaces, a muted gold accent for dividends/CTAs,
and monospaced tabular numbers for prices, tickers and market caps, styled with Tailwind CSS.
