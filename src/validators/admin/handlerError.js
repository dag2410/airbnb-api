const { validationResult } = require("express-validator");

const handlerError = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const formatted = errors
    .array({ onlyFirstError: true })
    .reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});

  const payload = {
    errors: formatted,
    old: { ...req.body, id: req.params.id },
    layout: res.layout || undefined,
    title: res.locals.title,
  };

  if (res.view && res.view.includes("users")) {
    const adminUserService = require("@/services/admin/user.admin.service");
    payload.roles = await adminUserService.listRoles();
  }

  res.render(res.view, payload);
};

module.exports = handlerError;
