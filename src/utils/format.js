/**
 * Display helpers for admin views.
 */
function getDisplayName(user) {
  if (!user) return "";
  const parts = [user.first_name, user.last_name].filter(Boolean);
  if (parts.length) return parts.join(" ");
  return user.username || user.email || "—";
}

function formatCurrency(amount, locale = "vi-VN", currency = "VND") {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date, locale = "vi-VN") {
  if (!date) return "—";

  return new Date(date).toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

module.exports = {
  formatDate,
};

module.exports = { getDisplayName, formatCurrency, formatDate };
