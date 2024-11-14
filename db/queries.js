const poolInstance = require("./pool");
const getMessages = async () => {
  const { rows } = await poolInstance.query(
    "SELECT messages.message, users.email FROM messages JOIN users ON messages.user_id = users.id;"
  );
  return rows;
};

const setMember = async (memberID, role) => {
  await poolInstance.query("UPDATE users SET role = $2 WHERE id = $1", [
    memberID,
    role,
  ]);
};

const createMessage = async (message, memberID) => {
  await poolInstance.query(
    "INSERT INTO messages (message,user_id) values ($1,$2)",
    [message, memberID]
  );
};

const getUserByUsername = async (username) => {
  const { rows } = await poolInstance.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  return rows;
};

module.exports = { getMessages, setMember, createMessage, getUserByUsername };
