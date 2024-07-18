const { express, Rrequest, Response } = require("express");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const version = require("./package.json").version;
const SwagerDef = require('./core/swagger-def.json');

module.exports = exports.swagger = (app) => {
  //swagger page
  app.use("/api-docs", swaggerui.serve, swaggerui.setup(SwagerDef));

  //swagger json
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(SwagerDef);
  });

}
