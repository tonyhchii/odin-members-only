const db = require("../db/queries");

const createMessage = async (req, res) => {
  const { message } = req.body;
  await db.createMessage(message, req.user.id);
  res.redirect("/");
};

const loadPage = (req, res) => {
  res.render("create-message-page");
};

module.exports = { createMessage, loadPage };
