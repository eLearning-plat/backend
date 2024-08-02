const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: '{yourApiIdentifier}',
  issuerBaseURL: `https://dev-nokuvgx3njqonar7.us.auth0.com/`,
});

module.exports = checkJwt;