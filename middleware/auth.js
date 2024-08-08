const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/user");
const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "this is a unique identtifier",
  issuerBaseURL: "https://dev-nokuvgx3njqonar7.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;
