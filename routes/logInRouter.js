const { Router } = require("express");
const logInRouter = Router();
const logInController = require("../controllers/logInController");
const passport = require("passport");

require("../config/passport");

logInRouter.get("/", logInController.loadPage);
logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);
module.exports = logInRouter;
