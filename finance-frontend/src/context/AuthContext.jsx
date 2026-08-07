import { createContext, useContext, useState, useCallback } from "react";
import * as api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ledger_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const persistSession = (data) => {
    // Backend returns NewUser { username, email, token }
    localStorage.setItem("ledger_token", data.token);
    localStorage.setItem("ledger_user", JSON.stringify(data));
    setUser(data);
  };

  const signIn = useCallback(async ({ username, password }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await api.login({ username, password });
      persistSession(res.data);
      return true;
    } catch (err) {
      setAuthError(extractError(err, "Invalid username or password."));
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const signUp = useCallback(async ({ userName, email, password }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await api.register({ userName, email, password });
      persistSession(res.data);
      return true;
    } catch (err) {
      setAuthError(extractError(err, "Could not create account."));
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("ledger_token");
    localStorage.removeItem("ledger_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, authError, authLoading, signIn, signUp, signOut, setAuthError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ASP.NET ModelState errors come back as { field: [messages] } or a plain string.
function extractError(err, fallback) {
  const data = err?.response?.data;
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  if (Array.isArray(data)) {
    return data.map((d) => d.description || d).join(" ");
  }
  if (typeof data === "object") {
    const messages = Object.values(data).flat();
    if (messages.length) return messages.join(" ");
  }
  return fallback;
}

export const useAuth = () => useContext(AuthContext);
