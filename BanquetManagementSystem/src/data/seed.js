import { PACKAGES } from "./constants.js";
import { offsetDate, toISO, genRef, uid } from "../utils/helpers.js";

export function seedBookings() {
  const pkgFor = (n) => PACKAGES.find((p) => p.name === n);
  const rows = [
    { name: "Bilal & Sana", fn: "Wedding", hall: "Grand Hall", off: 3, guests: 420, pkg: "Platinum", status: "confirmed" },
    { name: "Farah Traders", fn: "Corporate", hall: "Rooftop Terrace", off: 6, guests: 90, pkg: "Silver", status: "confirmed" },
    { name: "Ahmed Family", fn: "Mehndi", hall: "Garden Lawn", off: 9, guests: 300, pkg: "Gold", status: "pending" },
    { name: "Zara & Omar", fn: "Walima", hall: "Grand Hall", off: 14, guests: 480, pkg: "Platinum", status: "pending" },
    { name: "Hina's Birthday", fn: "Birthday", hall: "Rooftop Terrace", off: 18, guests: 60, pkg: "Silver", status: "confirmed" },
    { name: "Rizvi Engagement", fn: "Engagement", hall: "Garden Lawn", off: -4, guests: 250, pkg: "Gold", status: "confirmed" },
    { name: "Malik & Iqra", fn: "Wedding", hall: "Grand Hall", off: -12, guests: 500, pkg: "Platinum", status: "confirmed" },
    { name: "Noor Enterprises", fn: "Corporate", hall: "Rooftop Terrace", off: -20, guests: 120, pkg: "Gold", status: "rejected" },
    { name: "Saad's Mehndi", fn: "Mehndi", hall: "Garden Lawn", off: 24, guests: 280, pkg: "Gold", status: "pending" },
    { name: "Ali & Mahnoor", fn: "Wedding", hall: "Grand Hall", off: -35, guests: 460, pkg: "Platinum", status: "confirmed" },
  ];
  return rows.map((r) => ({
    id: uid(),
    ref: genRef(),
    guestName: r.name,
    phone: "0300-1234567",
    email: "guest@example.com",
    functionType: r.fn,
    hallType: r.hall,
    date: offsetDate(r.off),
    time: r.off % 2 === 0 ? "Evening" : "Day",
    guests: r.guests,
    pkg: r.pkg,
    price: pkgFor(r.pkg).price,
    status: r.status,
    notes: "",
    createdBy: "guest@example.com",
    createdAt: offsetDate(r.off - 5),
  }));
}

export function seedEmployees() {
  const rows = [
    { name: "Waqas Ahmed", role: "Manager", salary: 95000, off: -600 },
    { name: "Chef Imran", role: "Chef", salary: 80000, off: -500 },
    { name: "Chef Nadia", role: "Chef", salary: 78000, off: -400 },
    { name: "Yousuf Raza", role: "Waiter", salary: 35000, off: -300 },
    { name: "Bilqees Fatima", role: "Decorator", salary: 55000, off: -250 },
    { name: "Sikandar Khan", role: "Security", salary: 40000, off: -200 },
    { name: "Danish Ali", role: "Sound Engineer", salary: 60000, off: -150 },
  ];
  return rows.map((r) => ({
    id: uid(), name: r.name, role: r.role,
    phone: "0321-9876543", email: r.name.toLowerCase().replace(/\s+/g, ".") + "@alnoor.com",
    salary: r.salary, joinDate: offsetDate(r.off),
  }));
}

export function seedUsers() {
  return [
    { name: "Admin", email: "admin@alnoor.com", password: "admin123", role: "admin" },
    { name: "Ayesha Khan", email: "ayesha@example.com", password: "user123", role: "user" },
  ];
}

export function seedReviews() {
  const rows = [
    { name: "Zara & Omar", fn: "Walima", rating: 5, off: -30, text: "Our walima felt like it was designed for exactly us — the gold-lit stage was beyond what we imagined." },
    { name: "Farah Traders", fn: "Corporate", rating: 5, off: -60, text: "The coordinator handled three vendor changes on the day of and we never even noticed a hiccup." },
    { name: "Ahmed Family", fn: "Mehndi", rating: 4, off: -90, text: "Guests are still talking about the garden lawn setup — the fairy lights against the marquee were magic." },
  ];
  return rows.map((r) => ({
    id: uid(), name: r.name, functionType: r.fn, rating: r.rating, comment: r.text, date: offsetDate(r.off),
  }));
}
