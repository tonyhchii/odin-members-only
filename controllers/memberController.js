const db = require("../db/queries");

const loadPage = (req, res) => {
  res.render("member-page");
};

const registerMember = async (req, res) => {
  const { memberPassword } = req.body;
  console.log(memberPassword);
  if (memberPassword == "cats") {
    console.log("you are now a member");
    await db.setMember(req.user.id, "member");
  } else if (memberPassword == "catsadmin") {
    console.log("you are now an admin");
    await db.setMember(req.user.id, "admin");
  }
  res.redirect("/");
};

module.exports = { loadPage, registerMember };
