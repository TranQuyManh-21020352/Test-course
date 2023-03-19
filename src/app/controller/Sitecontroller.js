const student = require("../model/User/Student/Student");
const { mulMongooseToObject } = require("../../util/mongoose");
class SiteController {
  async index(req, res) {
    student
      .find({})
      .then((student) => {
        res.json(student);
      })
      .catch((error) => {
        console.log("failed!");
      });
  }

  createStudent(req, res) {
    res.render("students/signup");
  }

  createTeacher(req, res) {
    res.render("teachers/signup");
  }

  signin(req, res) {
    res.render("me/signin");
  }

  homePage(req, res) {
    res.render("home");
  }
}

module.exports = new SiteController();
