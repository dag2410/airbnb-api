const analyticsService = require("@/services/admin/analytics.service");
const { parseDateRange } = require("@/utils/dateRange");
const asyncHandler = require("@/utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const range = parseDateRange(req.query);
  const analytics = await analyticsService.getAnalytics(range);

  res.render("admin/analytics/index", {
    title: "Analytics",
    range,
    summary: analytics.summary,
    topRooms: analytics.topRooms,
    topCities: analytics.topCities,
    chartsJson: JSON.stringify(analytics.charts),
  });
});
