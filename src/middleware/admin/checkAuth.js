function checkAuth(req, res, next) {
  const isAuthRequired = !["/auth/login", "/auth/forgot-password"].includes(
    req.path,
  );
  if (!res.locals.auth && isAuthRequired) {
    return res.redirect("/admin/auth/login");
  }

  if (res.locals.auth && !isAuthRequired) {
    return res.redirect("/admin");
  }
  next();
}

module.exports = checkAuth;
