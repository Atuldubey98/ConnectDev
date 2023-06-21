const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const {
  getExistingOrCreateContact,
} = require("../controller/contactController");

const contactRouter = Router();

contactRouter.post("/", isAuthenticated, getExistingOrCreateContact);

module.exports = contactRouter;
