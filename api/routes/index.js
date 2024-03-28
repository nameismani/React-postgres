const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const path = "/api/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}user`, userRoute);

module.exports = router;
