const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

exports.findAll = async () => {
  const [users] = await db.query("select * from users order by id desc");
  return users;
};

exports.findById = async (id) => {
  const [users] = await db.query(
    `select * from users where id = ? or username = ?`,
    [id, id]
  );
  return users[0] ?? null;
};

exports.findByEmailAndPassword = async (email, password) => {
  const [users] = await db.query(
    `select * from users where email = ? and password = ?`,
    [email, password]
  );
  return users[0];
};

exports.findByEmail = async (email) => {
  const [users] = await db.query(`select * from users where email = ?`, [
    email,
  ]);
  return users[0];
};

exports.countNewUser = async () => {
  const date = new Date();
  date.setDate(-1);
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const startTime = `${currentDate} 00:00:00`;
  const endTime = `${currentDate} 23:59:59`;
  const [[{ count }]] = await db.query(
    "select count(*) as count from users where created_at between ? and ?",
    [startTime, endTime]
  );

  return count;
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);
  const query = `INSERT INTO users (${columns}) VALUES (${placeholders});`;
  const [{ insertId }] = await db.query(query, values);

  return {
    id: insertId,
    ...data,
  };
};

exports.update = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);
  values.push(id);
  const query = `UPDATE users SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);
  return {
    id,
    ...data,
  };
};

exports.remove = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  await db.query(query, [id]);
  return { id };
};

exports.count = async () => {
  const [[{ total }]] = await db.query("select count(*) as total from users");
  return total;
};
