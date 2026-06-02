/**
 * Admin HTML error handler — flash + redirect or render error page.
 */
function adminErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const message = err.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
  console.error("[Admin Error]", err);

  if (req.method === "GET") {
    res.flash({ type: "error", message });
    const referer = req.get("Referer");
    if (referer && referer.includes("/admin")) {
      return res.redirect(referer);
    }
    return res.redirect("/admin");
  }

  res.flash({ type: "error", message });
  const referer = req.get("Referer");
  return res.redirect(referer && referer.includes("/admin") ? referer : "/admin");
}

module.exports = adminErrorHandler;
