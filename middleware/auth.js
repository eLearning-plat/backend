const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Authorization token is missing");
  }

  try {
    const userInof = await axios.get(`${process.env.AUTH_ISSUER}/userinfo`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(userInof.data);
  } catch (error) {
    console.error("Error getting user info");
    return res.status(401).send("Invalid token");
  }

  next();
};
