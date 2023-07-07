const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const { getChatsByContactId } = require("../controller/chatsController");
const chatRouter = Router();
chatRouter.get("/:contactId", isAuthenticated, getChatsByContactId);

module.exports = chatRouter;
