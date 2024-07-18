const express = require("express");
const courseCtrl = require("../controllers/course");
const router = express.Router();

const multer = require("../middleware/multer-config");

router.post("/", multer, courseCtrl.createCourse);

router.get("/:id", courseCtrl.getOneCourse);

router.put("/:id", multer, courseCtrl.modifyCourse);

router.delete("/:id", courseCtrl.deleteCourse);

router.get("/", courseCtrl.getAllCourses);

module.exports = router;
