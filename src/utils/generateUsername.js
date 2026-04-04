const { User } = require("@/models");

async function generateUsername(lastName) {
  const base = lastName ? lastName.toLowerCase().replace(/\s+/g, "") : "user";
  let newUsername;
  let isTaken = true;

  while (isTaken) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newUsername = `${base}${randomNum}`;
    const existingName = await User.findOne({
      where: { username: newUsername },
    });

    if (!existingName) {
      isTaken = false;
    }
  }
  return newUsername;
}

module.exports = generateUsername;
