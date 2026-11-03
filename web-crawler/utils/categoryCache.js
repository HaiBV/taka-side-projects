const fs = require("fs");
const path = require("path");
const { getDateTime } = require("./getDateTime");
const { ensureOutputDirectory } = require("./outputDir");

const CACHE_PREFIX = "category-cache-";
const CACHE_HEADER = "Url\n";

const saveCategoryCache = (urls, directory = ensureOutputDirectory()) => {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  const filePath = path.join(directory, `${CACHE_PREFIX}${getDateTime()}.csv`);
  const rows = uniqueUrls.map((url) => `"${String(url).replaceAll('"', '""')}"`).join("\n");
  fs.writeFileSync(filePath, `${CACHE_HEADER}${rows}${rows ? "\n" : ""}`);
  return { filePath, urls: uniqueUrls };
};

const parseCachedUrl = (value) => {
  const url = value.trim();
  return url.startsWith('"') && url.endsWith('"')
    ? url.slice(1, -1).replaceAll('""', '"')
    : url;
};

const findLatestCategoryCache = (directory = ensureOutputDirectory()) => {
  if (!fs.existsSync(directory)) {
    return null;
  }

  const files = fs.readdirSync(directory)
    .filter((file) => file.startsWith(CACHE_PREFIX) && file.endsWith(".csv"))
    .map((file) => ({
      file,
      filePath: path.join(directory, file),
      modifiedAt: fs.statSync(path.join(directory, file)).mtimeMs,
    }))
    .sort((a, b) => b.modifiedAt - a.modifiedAt);

  return files[0]?.filePath || null;
};

const loadCategoryCache = (directory = ensureOutputDirectory()) => {
  const filePath = findLatestCategoryCache(directory);
  if (!filePath) {
    return null;
  }

  const [, ...rows] = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const urls = [...new Set(rows.map(parseCachedUrl).filter(Boolean))];
  return { filePath, urls };
};

module.exports = { saveCategoryCache, loadCategoryCache, findLatestCategoryCache };
