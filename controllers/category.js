//get all the categories

const Category = require("../models/category");

exports.getAllCategories = (req, res, next) => {
  Category.find()
    .then((documents) => {
      res.status(200).json({
        message: "Categories fetched successfully!",
        categories: documents,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//get a category by id

exports.getOneCategory = (req, res, next) => {
  Category.findById(req.params.id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({
          message: "Category not found!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//create a category

exports.createCategory = (req, res, next) => {
  const category = new Category({
    title: req.body.title,
    description: req.body.description
  });
  category
    .save()
    .then(() => {
      res.status(201).json({
        message: "Category added successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//update a category

exports.modifyCategory = (req, res, next) => {
  Category.updateOne({ _id: req.params.id }, {
    title: req.body.title,
    description: req.body.description
  }) // Removed the _id from the update object
    .then((result) => {
      if (result.matchedCount === 0) {
        // No documents matched the query. Document not found
        return res.status(404).json({
          message: "Category not found",
        });
      }
      res.status(200).json({
        message: "Category updated successfully!",
      });
    })
    .catch((error) => {
      console.error(error); // Log the error or handle specific error types as needed
      res.status(400).json({
        error: error,
      });
    });
};

//delete a category

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Category deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
