const express = require("express");
const router = express.Router();
const {
  registerUser,
  signIn,
  signout,
  testAuth,
} = require("../controller/auth.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");

router.route("/").post(upload, registerUser);
// router.route("/:id").get(testAuth);

router.route("/login").post(signIn);
router.route("/logout").post(verifyToken, signout);

module.exports = router;
