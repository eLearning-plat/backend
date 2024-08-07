const Blog = require("../models/blog");
const fs = require("fs");

//create a blog

exports.createBlog = (req, res, next) => {
  console.log("Request file:", req.file);
  console.log("Request body:", req.body);
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.files.file[0].filename
    }`,
    userId: req.body.userId,
    state: false,
    date: req.body.date,
  });
  blog
    .save()
    .then(() => res.status(201).json({ message: "Blog saved !" }))
    .catch((error) => res.status(400).json({ error }));
};

//get all blogs

exports.getAllBlogs = (req, res, next) => {
  
  const { userId, state } = req.query;
  let query = {};
  if (userId) {
    query.userId = userId;
  }
  if (state) {
    query.state = state;
  }

  Blog.find(query)
    .then((blogs) => res.status(200).json(blogs))
    .catch((error) => res.status(400).json({ error }));
};

//get a blog by id

exports.getOneBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => res.status(200).json(blog))
    .catch((error) => res.status(404).json({ error }));
};

//update a blog

exports.modifyBlog = (req, res, next) => {
  const blogObject = req.files.file[0]
    ? {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        userId: req.body.userId,
        state: req.body.state,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.files.file[0].filename
        }`,
      }
    : {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        userId: req.body.userId,
        state: req.body.state,
      };

  Blog.findOne({ _id: req.params.id })
    .then(() => {
      Blog.updateOne(
        { _id: req.params.id },
        { ...blogObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Blog modified!" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//delete a blog

exports.deleteBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      const filename = blog.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        blog
          .deleteOne({ _id: req.params.id })
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
