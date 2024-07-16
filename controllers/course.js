const Course = require("../models/course");
const fs = require("fs");

exports.createCourse = (req, res, next) => {
  //not done yet security issu in user id, to fix later
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    state: false,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(course);
  course
    .save()
    .then(() => res.status(201).json({ message: "Course saved !" }))
    .catch((error) => res.status(400).json({ error }));
};

//not done yet security issu in user id, to fix later
exports.modifyCourse = (req, res, next) => {
  const courseObject = req.file
    ? {
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        state: req.body.state,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete courseObject._userId;
  Course.findOne({ _id: req.params.id })
    .then(() => {
      Course.updateOne(
        { _id: req.params.id },
        { ...courseObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Objet modifié!" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneCourse = (req, res, next) => {
  Course.findOne({ _id: req.params.id })
    .then((Course) => res.status(200).json(Course))
    .catch((error) => res.status(404).json({ error }));
};


//not done yet security issu in user id, to fix later
exports.deleteCourse = (req, res, next) => {
  Course.findOne({ _id: req.params.id })
    .then((course) => {
      const filename = course.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Course.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllCourses = (req, res, next) => {
  Course.find()
    .then((Courses) => res.status(200).json(Courses))
    .catch((error) => res.status(400).json({ error }));
};
