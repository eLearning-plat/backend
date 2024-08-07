const express = require("express");
const categoryCtrl = require("../controllers/category");
const router = express.Router();

router.get("/",categoryCtrl.getAllCategories);

router.post("/", categoryCtrl.createCategory);

router.get("/:id", categoryCtrl.getOneCategory);

router.put("/:id", categoryCtrl.modifyCategory);

router.delete("/:id", categoryCtrl.deleteCategory);

module.exports = router;
