import axios from "axios";

// Point this at your backend. Defaults to the deployed FinanceProject API.
// Override by creating a .env file with VITE_API_URL=http://localhost:5271/api
const API_URL = import.meta.env.VITE_API_URL || "http://managefinance.runasp.net/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT to every request once the user is logged in.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ledger_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto sign-out on an expired/invalid token so the UI never gets stuck
// showing protected data with a dead session.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ledger_token");
      localStorage.removeItem("ledger_user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ---- Account -------------------------------------------------------------
export const login = (data) => api.post("/account/login", data);
export const register = (data) => api.post("/account/register", data);

// ---- Stocks ----------------------------------------------------------------
// query: { symbol, companyName, sortBy, isDescending, pageSize, pageNumber }
export const getStocks = (query = {}) => api.get("/stock", { params: query });
export const getStockById = (id) => api.get(`/stock/${id}`);

// ---- Portfolio -------------------------------------------------------------
export const getPortfolio = () => api.get("/portfolio");
export const addToPortfolio = (symbol) => api.post(`/portfolio/${symbol}`);
export const removeFromPortfolio = (companyName) =>
  api.delete("/portfolio", { params: { companyName } });

// ---- Comments ----------------------------------------------------------------
export const getComments = (query = {}) => api.get("/comment", { params: query });
export const createComment = (symbol, data) => api.post(`/comment/${symbol}`, data);
export const updateComment = (id, data) => api.put(`/comment/${id}`, data);
export const deleteComment = (id) => api.delete(`/comment/${id}`);

export default api;
