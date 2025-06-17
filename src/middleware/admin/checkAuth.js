function checkAuth(req, res, next) {
  const isAuthRequired = ![
    "/auth/register",
    "/auth/login",
    "/auth/verify-email",
    "/auth/forgot-password",
    "/auth/reset-password",
  ].includes(req.path);
  if (!res.locals.auth && isAuthRequired) {
    return res.redirect("/admin/auth/login");
  }

  if (res.locals.auth && !res.locals.auth.verified_at && isAuthRequired) {
    res.flash({
      type: "error",
      message: "Vui lòng xác minh địa chỉ email trước.",
    });
    return res.redirect("/admin/auth/login");
  }

  if (res.locals.auth && !isAuthRequired && res.locals.auth.verified_at) {
    return res.redirect("/admin");
  }
  next();
}

module.exports = checkAuth;
