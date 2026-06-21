const { crawlCategories } = require("./components/crawlCategories");
const { crawlPosts } = require("./components/crawlPosts");
require('dotenv').config()

// define a crawler function
const crawler = async () => {
  const categories = (process.env.CATEGORIES?.split(",") || []).filter((category) => category.trim() !== "" && category.match(/https?:\/\/(www\.)?truyenfull\.today\/the-loai\/.+/));
  if (categories.length === 0) {
    console.error("No categories provided. Please set the CATEGORIES environment variable.");
    console.log(`Categories: ${process.env.CATEGORIES}`)
    return;
  }
  console.log({ categories });

  const { postsUrlToVisit } = await crawlCategories(categories);
  console.log(`Found ${postsUrlToVisit.length} posts to visit.`);
  console.log({ postsUrlToVisit });

  await crawlPosts(postsUrlToVisit);

  console.log("CSV file has been successfully created!");
};

module.exports = { crawler };
