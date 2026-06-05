const dayjs = require("dayjs");
const { Op } = require("sequelize");
const { User } = require("@/models");

async function cleanUpUnverifiedUsers() {
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

  console.log(`Clean up unverified users at ${new Date()}`);
}

module.exports = cleanUpUnverifiedUsers;
