const User = require("../models/user");

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((documents) => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: documents,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createUser = (req, res, next) => {
  const user = new User({
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    nickname: req.body.nickname,
    name: req.body.name,
    picture: req.body.picture,
    email: req.body.email,
    email_verified: req.body.email_verified,
    role: req.body.role,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "User added successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateUser = (req, res, next) => {
  User.findById({ email: req.params.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      // Update user fields
      user.given_name = req.body.given_name;
      user.family_name = req.body.family_name;
      user.nickname = req.body.nickname;
      user.name = req.body.name;
      user.picture = req.body.picture;
      user.email = req.body.email;
      user.email_verified = req.body.email_verified;
      user.role = req.body.role;
      user.isVerified = req.body.isVerified;

      // Add new element to subscribedTo array
      if (req.body.subscribedTo) {
        user.subscribedTo.push(req.body.subscribedTo);
      }

      // Save updated user
      user
        .save()
        .then(() => {
          res.status(200).json({
            message: "User updated successfully!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
