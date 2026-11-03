const { crawler } = require("./crawler");

const useCategoryCache = process.argv.slice(2).some((arg) =>
  ["cached", "--cached", "--use-cache"].includes(arg.toLowerCase())
);

(async () => {
  const succeeded = await crawler({ useCategoryCache });
  if (!succeeded) {
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(`Unexpected crawler error: ${error.message}`);
  process.exitCode = 1;
});