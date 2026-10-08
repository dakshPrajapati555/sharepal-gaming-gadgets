export function formatRupees(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "₹ —";
  const rounded = Number.isInteger(amount) ? amount : amount.toFixed(2);
  return `₹${rounded}`;
}

export function formatCurrency(value) {
  return formatRupees(value);
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function rentalDays(start, end) {
  if (!start || !end) return 0;
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(`${end}T00:00:00`);
  const diff = Math.round((b - a) / 86400000) + 1;
  return diff > 0 ? diff : 0;
}

export function toIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
