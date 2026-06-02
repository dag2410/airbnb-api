const sidebarItems = [
  { title: "Dashboard", icon: "fa-home", path: "/" },
  { title: "Users", icon: "fa-users", path: "/users" },
  { title: "Rooms", icon: "fa-bed", path: "/rooms" },
  { title: "Bookings", icon: "fa-calendar-check", path: "/bookings" },
  { title: "Payments", icon: "fa-credit-card", path: "/payments" },
  { title: "Wallets", icon: "fa-wallet", path: "/wallets" },
  { title: "Reviews", icon: "fa-star", path: "/reviews" },
  { title: "Analytics", icon: "fa-chart-bar", path: "/analytics" },
  { title: "Settings", icon: "fa-cog", path: "/settings" },
];

function handleSidebar(req, res, next) {
  res.locals.path = req.path;
  res.locals.sidebarItems = sidebarItems;
  next();
}

module.exports = handleSidebar;
