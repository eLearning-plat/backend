const course = require("../models/course");
const Document = require("../models/document");
const fs = require("fs");

//using the document.js file in the router folder and document.js file in the models folder as a reference, create a new file in the controllers folder called document.js

module.exports.createDocument = (req, res, next) => {
  //not done yet security issu in user id, to fix later
  const document = new Document({
    title: req.body.title,
    description: req.body.description,
    file: `${req.protocol}://${req.get("host")}/files/${
      req.files.file[0].filename
    }`,
    categoryID: req.body.categoryID,
    userID: req.body.userID,
  });
  if (req.body.courseID) {
    document.courseID = req.body.courseID;
  }
  document
    .save()
    .then(() => res.status(201).json({ message: "Document saved !" }))
    .catch((error) => res.status(400).json({ error }));
};

//not done yet security issu in user id, to fix later
exports.modifyDocument = (req, res, next) => {
  const documentObject = req.files.file[0]
    ? {
        title: req.body.title,
        description: req.body.description,
        categoryID: req.body.category,
        courseID: req.body.courseID,
        status: req.body.status,
        file: `${req.protocol}://${req.get("host")}/files/${
          req.files.file[0].filename
        }`,
      }
    : {
        title: req.body.title,
        description: req.body.description,
        categoryID: req.body.category,
        status: req.body.status,
        courseID: req.body.courseID,
      };

  delete documentObject._userId;
  Document.findOne({ _id: req.params.id })
    .then(() => {
      Document.updateOne(
        { _id: req.params.id },
        { ...documentObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "document modifé" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneDocument = (req, res, next) => {
  Document.findOne({ _id: req.params.id })
    .then((document) => res.status(200).json(document))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllDocuments = (req, res, next) => {
  const { categoryID, userID, date, status, courseID } = req.query;
  let query = {};

  if (categoryID) {
    query.categoryID = categoryID;
  }
  if (userID) {
    query.userID = userID;
  }
  if (date) {
    query.date = new Date(date); // Assuming date is in a format that can be parsed by JavaScript Date
  }
  if (status) {
    query.status = status;
  }
  if (courseID) {
    query.courseID = courseID;
  }

  Document.find(query)
    .then((documents) => res.status(200).json(documents))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteDocument = (req, res, next) => {
  Document.findOne({ _id: req.params.id })
    .then((document) => {
      const filename = document.file.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Document.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Document deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
