const fs = require("fs");
const student = require("../model/User/Student/Student");
const { mongooseToObject } = require("../../util/mongoose");
const { validationResult } = require("express-validator");
class StudentController {
  //[GET]
  storeInfor(req, res, error) {
    student.findById(req.params.id).then((student) => {
      res.render("me/storeInfor", {
        user: mongooseToObject(student),
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
      const user = new student(data);
      user.save().then(() => {
        student
          .findOne({ email: req.body.email })
          .then((student) => {
            res.render("me/storeInfor", {
              user: mongooseToObject(student),
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
    student.findById(req.params.id).then((student) => {
      res.render("me/home", {
        user: mongooseToObject(student),
      });
    });
  }
}

module.exports = new StudentController();
