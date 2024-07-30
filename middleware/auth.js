const { auth } = require("express-oauth2-jwt-bearer");

module.exports = () => {
  // Authorization middleware. When used, the Access Token must
  // exist and be verified against the Auth0 JSON Web Key Set.
  const checkJwt = auth({
    audience: "668e8115fe64200436972a34",
    issuerBaseURL: `https://dev-nokuvgx3njqonar7.us.auth0.com/api/v2/`,
  });
};
