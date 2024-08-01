const Review = require("../models/review");

// get all reviews

exports.getAllReviews = (req, res, next) => {
  const { courseId, userId, verified } = req.query;
  let query = {};
  if (courseId) {
    query.courseId = courseId;
  }
  if (userId) {
    query.userId = userId;
  }
  if (verified) {
    query.verified = verified;
  }
  Review.find(query)
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

// get all verified reviews

exports.getAllVerifiedReviews = (req, res, next) => {
  Review.find({ verified: true })
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

// get all unverified reviews

exports.getAllUnverifiedReviews = (req, res, next) => {
  Review.find({ verified: false })
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

// Create and save a new review

exports.createReview = (req, res, next) => {
  const review = new Review({
    userId: req.body.userId,
    courseId: req.body.courseId,
    content: req.body.content,
    verified: false,
  });
  review
    .save()
    .then(() => res.status(201).json({ message: "Review saved !" }))
    .catch((error) => res.status(400).json({ error }));
};

// get review by id

exports.getOneReview = (req, res, next) => {
  Review.findOne({ _id: req.params.id })
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(404).json({ error }));
};

// update review by id

exports.modifyReview = (req, res, next) => {
  const reviewObject = {
    userId: req.body.userId,
    courseId: req.body.courseId,
    content: req.body.content,
    verified: req.body.verified,
  };
  Review.updateOne({ _id: req.params.id }, { reviewObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Review updated !" }))
    .catch((error) => res.status(400).json({ error }));
};

// delete review by id

exports.deleteReview = (req, res, next) => {
  Review.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Review deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};
