const { crawlCategories } = require("./components/crawlCategories");
const { crawlPosts } = require("./components/crawlPosts");
const { saveCategoryCache, loadCategoryCache } = require("./utils/categoryCache");
const { ensureOutputDirectory } = require("./utils/outputDir");
require("dotenv").config();

const isCategoryUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return (
      ["http:", "https:"].includes(parsedUrl.protocol) &&
      parsedUrl.pathname.startsWith("/the-loai/") &&
      parsedUrl.pathname.length > "/the-loai/".length
    );
  } catch {
    return false;
  }
};

const parseCategories = (value = "") => [
  ...new Set(
    value
      .split(",")
      .map((category) => category.trim())
      .filter(isCategoryUrl)
  ),
];

const crawler = async ({ useCategoryCache = false } = {}) => {
  if (useCategoryCache) {
    const cache = loadCategoryCache(ensureOutputDirectory());
    if (!cache) {
      console.error("No cached category file found.");
      return false;
    }

    console.log(`Using category cache ${cache.filePath} (${cache.urls.length} posts).`);
    try {
      await crawlPosts(cache.urls);
      console.log("CSV file has been successfully created!");
      return true;
    } catch (error) {
      console.error(`Crawler failed: ${error.message}`);
      return false;
    }
  }

  const categories = parseCategories(process.env.CATEGORIES);
  if (categories.length === 0) {
    console.error(
      "No valid categories provided. Set CATEGORIES to one or more truyenfull.today category URLs separated by commas."
    );
    return false;
  }

  try {
    const { postsUrlToVisit } = await crawlCategories(categories);
    console.log(`Found ${postsUrlToVisit.length} posts to visit.`);
    const cache = saveCategoryCache(postsUrlToVisit, ensureOutputDirectory());
    console.log(`Saved ${cache.urls.length} category posts to ${cache.filePath}.`);

    await crawlPosts(postsUrlToVisit);

    console.log("CSV file has been successfully created!");
    return true;
  } catch (error) {
    console.error(`Crawler failed: ${error.message}`);
    return false;
  }
};

module.exports = { crawler, parseCategories };
