const dayjs = require("dayjs");
const { Op } = require("sequelize");
const { User } = require("@/models");

export const cleanUpUnverifiedUsers = async () => {
  await User.destroy({
    where: {
      verified_at: {
        [Op.is]: null,
      },
      created_at: {
        [Op.lt]: dayjs().subtract(7, "day").toDate(),
      },
    },
  });
};
