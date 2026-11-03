const fs = require("fs");
const path = require("path");

const OUTPUT_DIRECTORY = path.join(__dirname, "..", "output");

const ensureOutputDirectory = () => {
  fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
  return OUTPUT_DIRECTORY;
};

module.exports = { OUTPUT_DIRECTORY, ensureOutputDirectory };
