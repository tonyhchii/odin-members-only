const { Router } = require("express");
const memberController = require("../controllers/memberController");
const memberRouter = Router();

memberRouter.get("/", memberController.loadPage);
memberRouter.post("/", memberController.registerMember);
module.exports = memberRouter;
