const express = require("express");
const meetingCtrl = require("../controllers/meeting");
const router = express.Router();

router.post("/", meetingCtrl.createMeeting);

router.get("/:id", meetingCtrl.getOneMeeting);

router.get("/", meetingCtrl.getAllMeetings);

router.put("/:id", meetingCtrl.modifyMeeting);

router.delete("/:id", meetingCtrl.deleteMeeting);

module.exports = router;
