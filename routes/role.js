const express = require("express");
const router = express.Router();
const checkJwt = require("../middleware/auth");

router.get("/", checkJwt, (req, res) => {
    const auth = req.auth;

    res.status(200).json(auth.payload["http://localhost:3000/roles"]);
});

module.exports = router;
