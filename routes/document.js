const express = require("express");
const documentCtrl = require("../controllers/document");
const router = express.Router();

const multer = require("../middleware/multer-config");

router.post("/", multer, documentCtrl.createDocument);

router.get("/:id", documentCtrl.getOneDocument);

router.put("/:id", multer, documentCtrl.modifyDocument);

router.delete("/:id", documentCtrl.deleteDocument);

router.get("/", documentCtrl.getAllDocuments);

module.exports = router;
