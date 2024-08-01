const Course = require("../models/course");
const fs = require("fs");


exports.createCourse = (req, res, next) => {
  //not done yet security issu in user id, to fix later
  
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    userId: req.body.userId,
    state: false,
    image: `${req.protocol}://${req.get("host")}/images/${
      req.files.image[0].filename
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
        category: req.body.category,
        userId: req.body.userId,
        state: req.body.state,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.files.image[0].filename
        }`,
      }
    : {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        userId: req.body.userId,
        state: req.body.state,
      };

  Course.findOne({ _id: req.params.id })
    .then(() => {
      Course.updateOne(
        { _id: req.params.id },
        { ...courseObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: req.body.title }))
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
      const filename = course.image.split("/images/")[1];
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
  const { category, userId, state } = req.query;
  const query = {};
  if (category) {
    query.category = category;
  }
  if (userId) {
    query.userId = userId;
  }
  if (state) {
    query.state = state;
  }

  Course.find(query)
    .then((Courses) => res.status(200).json(Courses))
    .catch((error) => res.status(400).json({ error }));
};
