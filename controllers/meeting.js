const course = require("../models/course");
const Meeting = require("../models/meeting");

//create a meeting

exports.createMeeting = (req, res, next) => {
  const meeting = new Meeting({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    userId: req.body.userId,
    courseId: req.body.courseId,
    url: req.body.url,
    
  });
  console.log(req.body.date);
  meeting
    .save()
    .then(() => res.status(201).json({ message: "Meeting saved !" }))
    .catch((error) => res.status(400).json({ error }));
};

//update a meeting

exports.modifyMeeting = (req, res, next) => {
  const meetingObject = { 
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    userId: req.body.userId,
    courseId: req.body.courseId,
    url: req.body.url
  };
  Meeting.findOne({ _id: req.params.id })
    .then(() => {
      Meeting.updateOne(
        { _id: req.params.id },
        { ...meetingObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Meeting modified!" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//delete a meeting

exports.deleteMeeting = (req, res, next) => {
  Meeting.findOne({ _id: req.params.id })
    .then((meeting) => {
      Meeting.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Meeting deleted!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//get all meetings

exports.getAllMeetings = (req, res, next) => {
  const { courseId, userId } = req.query;
  const query = {};
  if (courseId) {
    query.courseId = courseId;
  }
  if (userId) {
    query.userId = userId;
  }
  Meeting.find(query)
    .then((meetings) => res.status(200).json(meetings))
    .catch((error) => res.status(400).json({ error }));
};


//get a meeting by id

exports.getOneMeeting = (req, res, next) => {
  Meeting.findOne({ _id: req.params.id })
    .then((meeting) => res.status(200).json(meeting))
    .catch((error) => res.status(404).json({ error }));
};
