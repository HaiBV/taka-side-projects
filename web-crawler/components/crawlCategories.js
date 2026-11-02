const axios = require("axios");
const cheerio = require("cheerio");
const { normalizeUrl } = require("../utils/normalizeUrl");

const LIMIT_POSTS_TO_CRAWL = 1000;
const LIMIT_PAGES_TO_CRAWL = 100;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toAbsoluteUrl = (url, baseUrl) => {
  try {
    return normalizeUrl(new URL(url, baseUrl).toString());
  } catch {
    return null;
  }
};

const handleResponseCategory = (url, response) => {
  const $ = cheerio.load(response.data);
  const categoryUrls = $(".pagination li:not(.dropup) a[href]")
    .map((_, link) => toAbsoluteUrl(link.attribs.href, url))
    .get()
    .filter(Boolean);

  const postUrls = $(
    ".list-truyen:not(.list-cat):not(.list-side) .row:not(#the-loai-show-ads) .truyen-title a[href]"
  )
    .map((_, link) => toAbsoluteUrl(link.attribs.href, url))
    .get()
    .filter(Boolean);

  return { categoryUrls, postUrls };
};

const crawlCategories = async (urls = []) => {
  const categoriesUrlToVisit = [...urls];
  const visitedCategoryUrls = new Set();
  const postsUrlToVisit = new Set();
  let requestsUntilPause = Math.floor(Math.random() * 10) + 5;

  while (
    categoriesUrlToVisit.length > 0 &&
    visitedCategoryUrls.size < LIMIT_PAGES_TO_CRAWL &&
    postsUrlToVisit.size < LIMIT_POSTS_TO_CRAWL
  ) {
    const normalizedUrl = normalizeUrl(categoriesUrlToVisit.shift());
    if (!normalizedUrl || visitedCategoryUrls.has(normalizedUrl)) {
      continue;
    }

    visitedCategoryUrls.add(normalizedUrl);

    try {
      if (requestsUntilPause <= 0) {
        console.log("Waiting 15 seconds before continuing category crawl...");
        await delay(15000);
        requestsUntilPause = Math.floor(Math.random() * 10) + 5;
      }

      requestsUntilPause--;
      console.log(`Visiting category ${normalizedUrl}`);
      const response = await axios.get(normalizedUrl);
      const { categoryUrls, postUrls } = handleResponseCategory(normalizedUrl, response);

      categoriesUrlToVisit.push(...categoryUrls);
      postUrls.forEach((postUrl) => {
        if (postsUrlToVisit.size < LIMIT_POSTS_TO_CRAWL) {
          postsUrlToVisit.add(postUrl);
        }
      });
    } catch (error) {
      console.error(`Error fetching category ${normalizedUrl}: ${error.message}`);
    }
  }

  return { postsUrlToVisit: [...postsUrlToVisit] };
};

module.exports = { crawlCategories, handleResponseCategory };