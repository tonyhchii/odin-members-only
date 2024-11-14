const db = require("../db/queries");
const mainPageController = async (req, res) => {
  const messages = await db.getMessages();
  console.log(messages);
  res.render("index", { messages: messages });
};

module.exports = mainPageController;
