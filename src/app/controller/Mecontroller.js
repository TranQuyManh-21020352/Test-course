const student = require("../model/User/Student/Student");
const teacher = require("../model/User/Teacher/Teacher");
const { mongooseToObject } = require("../../util/mongoose");
const { validationResult } = require("express-validator");
class MeController {
  //[GET]
  storeInfor(req, res, error) {
    if (req.params.slug === "Teacher") {
      teacher.findById(req.params.id).then((teacher) => {
        res.render("me/storeInfor", {
          user: mongooseToObject(teacher),
        });
      });
    } else if (req.params.slug === "Student") {
      student.findById(req.params.id).then((student) => {
        res.render("me/storeInfor", {
          user: mongooseToObject(student),
        });
      });
    }
  }

  //[GET]
  MyHome(req, res) {
    if (req.params.slug === "Teacher") {
      teacher.findById(req.params.id).then((teacher) => {
        res.render("me/home", {
          user: mongooseToObject(teacher),
        });
      });
    } else if (req.params.slug === "Student") {
      student.findById(req.params.id).then((student) => {
        res.render("me/home", {
          user: mongooseToObject(student),
        });
      });
    }
  }

  async resetPasswordHome(req, res) {
    if (req.params.slug === "Teacher") {
      await teacher.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { password: req.body.password } },
        { upsert: true }
      );
    } else if (req.params.slug === "Student") {
      await student.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { password: req.body.password } },
        { upsert: true }
      );
    }
    res.redirect(`/me/${req.params.slug}/${req.params.id}/MyHome`);
  }

  storeIn(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.json(error);
    } else {
      student
        .findOne({ email: req.body.email, password: req.body.password })
        .then((student) => {
          if (student !== null) {
            res.render("me/storeInfor", {
              user: mongooseToObject(student),
            });
          } else {
            teacher
              .findOne({ email: req.body.email, password: req.body.password })
              .then((teacher) => {
                if (teacher !== null) {
                  res.render("me/storeInfor", {
                    user: mongooseToObject(teacher),
                  });
                } else {
                  res.redirect("back");
                }
              })
              .catch((error) => {
                res.send(error);
              });
          }
        })
        .catch((error) => {
          res.send(error);
        });
    }
  }

  storeTest(req, res) {
    student
      .findOne({ email: req.body.email, password: req.body.password })
      .then((student) => {
        if (student !== null) {
          res.json(student);
        } else {
          teacher
            .findOne({ email: req.body.email, password: req.body.password })
            .then((teacher) => {
              if (teacher !== null) {
                res.json(teacher);
              } else {
                res.json({ messsage: "Account do not exist" });
              }
            })
            .catch((error) => {
              res.send(error);
            });
        }
      })
      .catch((error) => {
        res.send(error);
      });
  }

  async show(req, res) {
    try {
      const user = await student.find({});
      res.json(user);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = new MeController();
