const axios = require("axios");
const cheerio = require("cheerio");
const { normalizeUrl } = require("../utils/normalizeUrl");

const LIMIT_POSTS_TO_CRAWL = 1000;
const LIMIT_PAGES_TO_CRAWL = 100;

 // save the page to the database
const handleResponseCategory = async (url, response) => {
  const catUrls = [];
  const postUrls = [];
  // implement your database query here to save the page to the database
  // parse the HTML content using a library like cheerio
  const $ = cheerio.load(response.data);

  // extract and follow links from the HTML content
  const categoriesPageLink = $(".pagination li:not(.dropup) a[href]");

  for (const link of categoriesPageLink) {
    const absoluteLink = new URL(link.attribs.href, url).toString();
    catUrls.push(absoluteLink);
  }

  const postsPageLink = $(
    ".list-truyen:not(.list-cat):not(.list-side) .row:not(#the-loai-show-ads) .truyen-title a[href]"
  );
  for (const link of postsPageLink) {
    const absoluteLink = normalizeUrl(new URL(link.attribs.href, url).toString());
    postUrls.push(absoluteLink);
  }

  return {catUrls, postUrls};
};

const crawlCategories = async (urls) => {
  const categoriesUrlToVisit = urls || [];
  const visitedCategoriesUrl = new Set();

  const postsUrlToVisit = new Set();

  let maxCrawlLength = Math.floor(Math.random() * 10) + 5;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (categoriesUrlToVisit.length > 0 && visitedCategoriesUrl.size < LIMIT_PAGES_TO_CRAWL && postsUrlToVisit.size < LIMIT_POSTS_TO_CRAWL) {
    // console.log(`Crawled ${visitedCategoriesUrl.size} categories, found ${postsUrlToVisit.size} posts so far.`);
    const url = categoriesUrlToVisit.shift();
    // normalize the URL to remove any query parameters and trailing slash
    const normalizedUrl = normalizeUrl(url);

    try {
      // check if the URL has already been visited
      if (!normalizedUrl) {
        // console.log(`Normalized URL for ${url} is invalid. Skipping.`);
        continue;
      }
      if (visitedCategoriesUrl.has(normalizedUrl)) {
        // console.log(`${normalizedUrl} has already been crawled. Skipping.`);
        continue;
      }

      // check if the maximum crawl length has been reached
      if (maxCrawlLength <= 0) {
        console.log("Waited 15s");
        await delay(15000);
        maxCrawlLength = Math.floor(Math.random() * 10) + 5;
        // break;
      }

      maxCrawlLength--;
      console.log(`Visiting ${normalizedUrl}`);
      // fetch and parse the HTML content of the page
      const response = await axios.get(normalizedUrl);

      const { catUrls, postUrls } = await handleResponseCategory(normalizedUrl, response);

      categoriesUrlToVisit.push(...catUrls);
      postUrls.forEach((url) => postsUrlToVisit.add(url));

      visitedCategoriesUrl.add(normalizedUrl);
    } catch (error) {
      // handle any error that occurs during the HTTP request
      console.error(`Error fetching ${normalizedUrl}: ${error.message}`);
    }
  }

  return { postsUrlToVisit: Array.from(postsUrlToVisit) };
};

module.exports = { crawlCategories };