const bcrypt = require("bcryptjs");
const poolInstance = require("../db/pool");

const loadPage = (req, res) => res.render("sign-up-form");

const signUpUser = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    await poolInstance.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [req.body.username, hashedPassword]
    );
  });
  res.redirect("/");
};

module.exports = { loadPage, signUpUser };
