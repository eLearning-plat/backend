const express = require("express");
const courseCtrl = require("../controllers/course");
const multer = require("../middleware/multer-config");

const router = express.Router();

router.post("/", multer, courseCtrl.createCourse);

router.get("/:id", courseCtrl.getOneCourse);

router.put("/:id", courseCtrl.modifyCourse);

router.delete("/:id", courseCtrl.deleteCourse);

router.get("/", courseCtrl.getAllCourses);

module.exports = router;
