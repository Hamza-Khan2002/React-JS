export function pad(n) {
  return String(n).padStart(2, "0");
}

export function toISO(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toISO(d);
}

export function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function fmtMoney(n) {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}

export function genRef() {
  const y = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ANB-${y}-${rand}`;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
