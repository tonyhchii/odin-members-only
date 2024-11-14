const { Router } = require("express");
const createMessageController = require("../controllers/createMessageController");
const createMessageRouter = Router();

createMessageRouter.get("/", createMessageController.loadPage);
createMessageRouter.post("/", createMessageController.createMessage);
module.exports = createMessageRouter;
