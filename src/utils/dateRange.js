/**
 * Parse admin analytics date range from query string.
 */
function parseDateRange(query = {}) {
  const preset = query.range || "month";
  const now = new Date();

  let end = new Date(now);
  end.setHours(23, 59, 59, 999);

  let start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const labels = {
    today: "Hôm nay",
    yesterday: "Hôm qua",
    week: "7 ngày qua",
    month: "30 ngày qua",
    quarter: "90 ngày qua",
    year: "365 ngày qua",
    custom: "Tùy chọn",
  };

  switch (preset) {
    case "today":
      break;
    case "yesterday":
      start.setDate(start.getDate() - 1);
      end = new Date(start);
      end.setHours(23, 59, 59, 999);
      break;
    case "week":
      start.setDate(start.getDate() - 6);
      break;
    case "month":
      start.setDate(start.getDate() - 29);
      break;
    case "quarter":
      start.setDate(start.getDate() - 89);
      break;
    case "year":
      start.setDate(start.getDate() - 364);
      break;
    case "custom":
      if (query.startDate && query.endDate) {
        start = new Date(query.startDate);
        start.setHours(0, 0, 0, 0);
        end = new Date(query.endDate);
        end.setHours(23, 59, 59, 999);
      }
      break;
    default:
      start.setDate(start.getDate() - 29);
  }

  const durationMs = end.getTime() - start.getTime();
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - durationMs);
  prevStart.setHours(0, 0, 0, 0);

  const days = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60 * 24)));

  return {
    preset,
    label: labels[preset] || labels.month,
    start,
    end,
    prevStart,
    prevEnd,
    days,
    startDateStr: start.toISOString().slice(0, 10),
    endDateStr: end.toISOString().slice(0, 10),
  };
}

function percentChange(current, previous) {
  const cur = Number(current) || 0;
  const prev = Number(previous) || 0;
  if (prev === 0) return cur > 0 ? 100 : 0;
  return Number((((cur - prev) / prev) * 100).toFixed(1));
}

module.exports = { parseDateRange, percentChange };
