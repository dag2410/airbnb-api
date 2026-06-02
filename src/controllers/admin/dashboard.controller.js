const adminDashboardService = require("@/services/admin/dashboard.admin.service");
const asyncHandler = require("@/utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const data = await adminDashboardService.getOverview();
  const monthlyRevenue = data.monthlyRevenue || [];

  res.render("admin/dashboard/index", {
    title: "Dashboard",
    stats: data.stats,
    latestPayments: data.latestPayments || [],
    latestBookings: data.latestBookings || [],
    monthlyRevenueLabels: monthlyRevenue.map((r) => r.month),
    monthlyRevenueValues: monthlyRevenue.map((r) => Number(r.total) || 0),
  });
});
