const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { registerSwagger } = require("./swagger");
const { errorHandler } = require("./middleware/errorHandler");
const routes = require("./routes");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  registerSwagger(app);

  app.use(routes);

  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

