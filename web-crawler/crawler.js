const { crawlCategories } = require("./components/crawlCategories");
const { crawlPosts } = require("./components/crawlPosts");
require("dotenv").config();

const isCategoryUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return (
      ["http:", "https:"].includes(parsedUrl.protocol) &&
      ["truyenfull.today", "www.truyenfull.today"].includes(parsedUrl.hostname) &&
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

const crawler = async () => {
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

    await crawlPosts(postsUrlToVisit);

    console.log("CSV file has been successfully created!");
    return true;
  } catch (error) {
    console.error(`Crawler failed: ${error.message}`);
    return false;
  }
};

module.exports = { crawler, parseCategories };
