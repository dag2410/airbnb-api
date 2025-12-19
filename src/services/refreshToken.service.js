const { Op } = require("sequelize");
const { RefreshToken } = require("@/models");
const generateToken = require("@/utils/generateToken");
const { REFRESH_TOKEN_EXPIRES_IN } = require("@/configs/auth");

const generateUniqueToken = async () => {
  let randomToken = null;
  do {
    randomToken = generateToken();
  } while (
    await RefreshToken.findOne({
      where: { token: randomToken },
    })
  );

  return randomToken;
};

const createRefreshToken = async (userId) => {
  const token = await generateUniqueToken();
  const expiredAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN);

  return await RefreshToken.create({
    user_id: userId,
    token: token,
    expired_at: expiredAt,
  });
};

const findValidRefreshToken = async (token) => {
  return await RefreshToken.findOne({
    where: {
      token: token,
      expired_at: {
        [Op.gte]: new Date(),
      },
    },
  });
};

const deleteRefreshToken = async (refreshToken) => {
  await refreshToken.destroy();
};

module.exports = {
  generateUniqueToken,
  createRefreshToken,
  findValidRefreshToken,
  deleteRefreshToken,
};
