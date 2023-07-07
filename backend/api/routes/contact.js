const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const {
  getExistingOrCreateContact,
  getContactsOfCurrentUser,
} = require("../controller/contactController");
const contactRouter = Router();

contactRouter.post("/", isAuthenticated, getExistingOrCreateContact);
contactRouter.get("/", isAuthenticated, getContactsOfCurrentUser);
module.exports = contactRouter;
