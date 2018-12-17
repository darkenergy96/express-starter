const express = require("express");
const middlewares = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const hpp = require("hpp");
function loadMiddlewares(app) {
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(hpp());
  app.use(cookieParser());
  app.use(bodyParser.json());
}
module.exports = loadMiddlewares;
