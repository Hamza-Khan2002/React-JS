export const FUNCTION_TYPES = ["Wedding", "Walima", "Mehndi", "Engagement", "Corporate", "Birthday"];

export const HALLS = [
  { name: "Grand Hall", capacity: 500 },
  { name: "Garden Lawn", capacity: 800 },
  { name: "Rooftop Terrace", capacity: 250 },
];

export const PACKAGES = [
  {
    id: "silver", name: "Silver", price: 150000, capacity: 200, popular: false,
    features: ["Standard hall decor", "Buffet catering (3 dishes)", "Basic sound system", "4-hour slot", "Standard seating"],
  },
  {
    id: "gold", name: "Gold", price: 250000, capacity: 350, popular: true,
    features: ["Premium stage decor", "Buffet + live counters (5 dishes)", "Full sound & lighting", "6-hour slot", "Themed seating", "Dedicated coordinator"],
  },
  {
    id: "platinum", name: "Platinum", price: 400000, capacity: 500, popular: false,
    features: ["Signature designer decor", "Multi-cuisine live counters (8 dishes)", "Premium AV + LED wall", "8-hour slot", "Luxury seating & lounge", "Dedicated coordinator", "Complimentary bridal suite"],
  },
];

export const EMP_ROLES = ["Manager", "Chef", "Waiter", "Decorator", "Security", "Sound Engineer"];

export const STATUS_META = {
  pending: { label: "Pending", cls: "badge-pending" },
  confirmed: { label: "Confirmed", cls: "badge-confirmed" },
  rejected: { label: "Rejected", cls: "badge-rejected" },
};

export const PIE_COLORS = ["#8B1A2F", "#C4923A", "#5C7A5E", "#4C6E91"];

export const GALLERY_ITEMS = [
  { id: 1, cat: "Halls", title: "Grand Hall — Stage View", tone: "maroon" },
  { id: 2, cat: "Halls", title: "Garden Lawn — Dusk", tone: "gold" },
  { id: 3, cat: "Halls", title: "Rooftop Terrace — Night", tone: "ink" },
  { id: 4, cat: "Décor", title: "Floral Mehndi Stage", tone: "gold" },
  { id: 5, cat: "Décor", title: "Walima Centerpiece", tone: "maroon" },
  { id: 6, cat: "Décor", title: "Corporate Backdrop", tone: "ink" },
  { id: 7, cat: "Seating", title: "Royal Banquet Rounds", tone: "maroon" },
  { id: 8, cat: "Seating", title: "Lounge Reception Set", tone: "gold" },
  { id: 9, cat: "Catering", title: "Live Grill Counter", tone: "ink" },
  { id: 10, cat: "Catering", title: "Dessert Table", tone: "gold" },
  { id: 11, cat: "Seating", title: "Garden Ceremony Chairs", tone: "maroon" },
  { id: 12, cat: "Catering", title: "Multi-Cuisine Buffet", tone: "ink" },
];

export const GALLERY_CATS = ["All", "Halls", "Décor", "Seating", "Catering"];

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
