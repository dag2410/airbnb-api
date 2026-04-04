const throwError = require("./throwError");

const services = {
  user: require("@/services/user.service"),
  room: require("@/services/room.service"),
  review: require("@/services/review.service"),
  notification: require("@/services/notification.service"),
  conversation: require("@/services/conversation.service"),
  booking: require("@/services/booking.service"),
};

const useSlug = ["room"];

function attachResourceLoader(router, params) {
  params.forEach((param) => {
    router.param(param, async (req, res, next, id) => {
      const resource = useSlug.includes(param)
        ? await services[param].getBySlug(id)
        : await services[param].getById(id);

      if (!resource) throwError(404, `${param} không tồn tại.`);
      req[param] = resource;
      next();
    });
  });
}

module.exports = attachResourceLoader;
