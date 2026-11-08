// Persists app data in the browser's localStorage.
// Swap this file out for a real API/database layer when you connect a backend.

const PREFIX = "alnoor:";

export function loadKey(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* corrupt or unavailable — fall back to seed data */
  }
  return fallback;
}

export function saveKey(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    /* storage full or unavailable — silently ignore */
  }
}
