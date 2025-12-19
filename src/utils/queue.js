const { Queue } = require("@/models");

async function dispatch(type, payload) {
  await Queue.create({
    type,
    payload: JSON.stringify(payload),
  });
}

module.exports = {
  dispatch,
};
