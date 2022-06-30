const { Router } = require("express");
const router = Router();
const { registerUser, loginUser } = require("../controller/userController");
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
