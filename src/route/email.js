const express = require("express");
const router = express.Router();

const EmailController = require("../app/controller/Emailcontroller");
router.post("/inputOTP", EmailController.sendEmail);
router.post("/:slug/ResetPassword", EmailController.checkOTP);
router.use("/verifyOTP", EmailController.verifyOTP);
module.exports = router;
