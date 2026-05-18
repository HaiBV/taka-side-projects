const { crawlCategories } = require("./components/crawlCategories");
const { crawlPosts } = require("./components/crawlPosts");

// define a crawler function
const crawler = async () => {
  const { postsUrlToVisit } = await crawlCategories(["https://truyenfull.today/the-loai/trong-sinh/hoan/"]);
  console.log(`Found ${postsUrlToVisit.length} posts to visit.`);
  // console.log({ postsUrlToVisit });

  await crawlPosts(postsUrlToVisit);

  console.log("CSV file has been successfully created!");
};

module.exports = { crawler };
