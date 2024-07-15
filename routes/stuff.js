const express = require("express");
const Thing = require("../models/thing");
const stuffCtrl = require("../controllers/stuff");
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/", stuffCtrl.createThing);

router.get("/:id", stuffCtrl.getOneThing);

router.put("/:id", stuffCtrl.modifyThing);

router.delete("/:id", stuffCtrl.deleteThing);

router.get("/", stuffCtrl.getAllStuff);

module.exports = router;