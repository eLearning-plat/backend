const Document = require("../models/course");
const fs = require("fs");

//using the document.js file in the router folder and document.js file in the models folder as a reference, create a new file in the controllers folder called document.js

module.exports.createDocument = (req, res, next) => {
  //not done yet security issu in user id, to fix later
  const document = new Document({
    title: req.body.title,
    description: req.body.description,
    file: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    userId: req.body.userId,
    categoryID: req.body.categoryID,
    status: false,
  });
  console.log(document);
  document
    .save()
    .then(() => res.status(201).json({ message: "Document saved !" }))
    .catch((error) => res.status(400).json({ error }));
};

//not done yet security issu in user id, to fix later
exports.modifyDocument = (req, res, next) => {
  const documentObject = req.file
    ? {
        title: req.body.title,
        description: req.body.description,
        file: req.body.file,
        userId: req.body.userId,
        categoryID: req.body.categoryID,
        status: req.body.status,
      }
    : {
        title: req.body.title,
        description: req.body.description,
        file: req.body.file,
        userId: req.body.userId,
        categoryID: req.body.categoryID,
        status: req.body.status,
      };

  delete documentObject._userId;
  Document.findOne({ _id: req.params.id })
    .then((document) => {
      const filename = document.file.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Document.deleteOne({ _id: req.params.id })
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

exports.getOneDocument = (req, res, next) => {
  Document.findOne({ _id: req.params.id })
    .then((document) => res.status(200).json(document))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllDocuments = (req, res, next) => {
  Document.find()
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
