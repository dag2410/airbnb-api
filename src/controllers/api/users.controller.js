const usersService = require("@/services/users.service");
const { success } = require("../../utils/response");

exports.getList = async (req, res) => {
  const users = await usersService.getAll();
  success(res, 200, users);
};

exports.getOne = async (req, res) => {
  success(res, 200, req.user);
};

exports.create = async (req, res) => {
  const user = await usersService.create(req.body);
  success(res, 201, user);
};

exports.update = async (req, res) => {
  const user = await usersService.update(req.user.id, req.body);
  success(res, 200, user);
};

exports.remove = async (req, res) => {
  await usersService.remove(req.user.id);
  success(res, 200);
};

exports.getEmailImage = async (req, res) => {
  const userId = req.params.id;
  await usersService.update(userId, {
    email_seen_at: new Date(),
  });
  const imgPath = path.join(
    __dirname,
    "../../..",
    `public/assets/img/image.jpg`
  );
  res.sendFile(imgPath);
};
