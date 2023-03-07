const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const { createContact, getContacts,getChatsByRoomId } = require("../controller/chatController");

const chatRouter = Router();

chatRouter
  .post("/contact", isAuthenticated, createContact)
  .get("/contact", isAuthenticated, getContacts);

chatRouter.get("/chats/:roomId", isAuthenticated, getChatsByRoomId);
module.exports = chatRouter;
