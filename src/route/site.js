const express = require("express");
const router = express.Router();

const siteController = require("../app/controller/Sitecontroller");
router.use("/students/signup", siteController.createStudent);
router.use("/teachers/signup", siteController.createTeacher);
router.use("/user/signin", siteController.signin);
router.use("/", siteController.homePage);
module.exports = router;
