const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");

signUpRouter.get("/", signUpController.loadPage);
signUpRouter.post("/", signUpController.signUpUser);

module.exports = signUpRouter;
