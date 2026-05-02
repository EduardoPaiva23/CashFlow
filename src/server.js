const { createApp } = require("./app");
const { env } = require("./config/env");
const { connectMongo } = require("./config/db");

async function main() {
  await connectMongo(env.mongoDbUri);

  const app = createApp();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on ${env.baseUrl}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

