const express = require("express");
const router = express.Router();
const MeController = require("../app/controller/Mecontroller");
const validator = require("../app/middlewares/validator/validator");
// router.use("/myProfile", MeController.storeInfor);
router.use("/:slug/:id/MyProfile", MeController.storeInfor);
router.use("/:slug/:id/MyHome", MeController.MyHome);
router.post(
  "/signin/MyProfile",
  validator.validatorLogin(),
  MeController.storeIn
);
module.exports = router;
