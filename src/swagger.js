const path = require("path");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

function registerSwagger(app) {
  const swaggerPath = path.join(__dirname, "..", "swagger.yaml");
  const spec = YAML.load(swaggerPath);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}

module.exports = { registerSwagger };

