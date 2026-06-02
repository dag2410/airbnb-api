const { User, Role } = require("@/models");
const { getDisplayName, formatCurrency, formatDate } = require("@/utils/format");

async function shareLocals(req, res, next) {
  const userId = req.session.userId;
  res.locals.auth = null;

  if (userId) {
    res.locals.auth = await User.findByPk(userId, {
      include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
    });
  }

  res.locals.getDisplayName = getDisplayName;
  res.locals.formatCurrency = formatCurrency;
  res.locals.formatDate = formatDate;
  res.locals.query = req.query;
  const flashKey = "adminFlash";
  res.locals.flash = Array.isArray(req.session[flashKey])
    ? req.session[flashKey]
    : [];
  res.locals.getFlashMessages = (type) => {
    if (type) {
      return res.locals.flash.filter((msg) => msg.type === type);
    }
    return res.locals.flash;
  };
  delete req.session[flashKey];
  delete req.session.flash;

  next();
}

module.exports = shareLocals;
