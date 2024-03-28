const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");
const { updateUser } = require("../controller/user.controller");

router.route("/profile").post(verifyToken, upload, updateUser);

module.exports = router;
