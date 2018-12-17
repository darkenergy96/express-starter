require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const loadMiddlewares = require("./routes/middlewares");
const initRoutes = require("./routes/index");
const dbURL = process.env.dbURL || "mongodb://localhost:27017";
const errorHandler = require("./utils/error-handler");
mongoose.connect(dbURL);
const app = express();
loadMiddlewares(app);
initRoutes(app);
app.use(errorHandler);
const port = process.env.port || 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`Ready on http://localhost:${port}`);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected\n");
  process.exit(0);
});
