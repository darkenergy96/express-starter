const authRoutes = require("./auth/local");
function initRoutes(app) {
  app.use(authRoutes);
}
module.exports = initRoutes;
