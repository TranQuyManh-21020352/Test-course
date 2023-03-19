const teacher = require("../model/User/Teacher/Teacher");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { mongooseToObject } = require("../../util/mongoose");
// const { mulMongooseToObject } = require("../../util/mongoose");
class TeacherController {
  storeInfor(req, res, error) {
    teacher.findById(req.params.id).then((teacher) => {
      res.render("me/storeInfor", {
        user: mongooseToObject(teacher),
      });
    });
  }

  // [POST]when sign up
  storeUp(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.json(error);
    } else {
      const data = req.body;
      data["avatar"] = {
        name: req.file.originalname,
        data: fs.readFileSync(req.file.path).toString("base64"),
        contentType: req.file.mimetype,
      };
      const user = new teacher(data);
      user.save().then(() => {
        teacher
          .findOne({ email: req.body.email })
          .then((teacher) => {
            res.render("me/storeInfor", {
              user: mongooseToObject(teacher),
            });
          })
          .catch((error) => {
            res.send(error);
          });
      });
    }
  }
  //[GET]
  MyHome(req, res) {
    teacher.findById(req.params.id).then((teacher) => {
      res.render("me/home", {
        user: mongooseToObject(teacher),
      });
    });
  }
}

module.exports = new TeacherController();
