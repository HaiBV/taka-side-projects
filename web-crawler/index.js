const { crawler } = require("./crawler");

(async () => {
  const succeeded = await crawler();
  if (!succeeded) {
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(`Unexpected crawler error: ${error.message}`);
  process.exitCode = 1;
});