const { Router } = require("express");
const mainPageController = require("../controllers/mainPageController");
const mainPageRouter = Router();

mainPageRouter.get("/", mainPageController);
module.exports = mainPageRouter;
