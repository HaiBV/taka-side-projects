const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { normalizeUrl } = require("../utils/normalizeUrl");
const { getDateTime } = require("../utils/getDateTime");

const LIMIT_POSTS_TO_CRAWL = 1000;

const extractPageNumberFromUrl = (url) => {
  const match = url.match(/trang-(\d+)/);

  const pageNumber = match ? parseInt(match[1], 10) : null;
  return pageNumber;
}

const crawlPosts = async (urls) => {
  const postsUrlToVisit = urls || [];
  const visitedPostsUrl = new Set();

  let maxCrawlLength = Math.floor(Math.random() * 10) + 5;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const filePath = `posts-${getDateTime()}.csv`;
  const header = "Title;Author;Rate;Count;Total Chapters;Url;Genres\n";

  // Write header (only once)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header);
  }

  const stream = fs.createWriteStream(filePath, { flags: "a" });
  while (postsUrlToVisit.length > 0 && visitedPostsUrl.size < LIMIT_POSTS_TO_CRAWL) {
    const url = postsUrlToVisit.shift();
    // normalize the URL to remove any query parameters and trailing slash
    const normalizedUrl = normalizeUrl(url);

    try {
      // check if the URL has already been visited
      if (!normalizedUrl) {
        // console.log(`Normalized URL for ${url} is invalid. Skipping.`);
        continue;
      }
      if (visitedPostsUrl.has(normalizedUrl)) {
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

      // parse the HTML content using a library like cheerio
      const $ = cheerio.load(response.data);

      // extract and follow links from the HTML content
      const title = $('h3.title[itemprop="name"]').text();
      const ratingValue = $('.rate span[itemprop="ratingValue"]').text();
      const ratingCount = $('.rate span[itemprop="ratingCount"]').text();

      const author = $('.info a[itemprop="author"]').text();
      const genreLinks = $('.info a[itemprop="genre"]');

      const genres = [];
      for (const genreLink of genreLinks) {
        genres.push(genreLink.attribs.title);
      }

      let totalChapters = 0;
      const PER_PAGE = 50;
      // calc chapters number
      const lastPageLink = $('ul.pagination li a:has(.arrow)');
      const maxPageLink = $('ul.pagination li a:not(:has(.sr-only))');
      if (lastPageLink.length > 0) {
        const lastChapterUrl = new URL(lastPageLink.attr('href'), normalizedUrl).toString();
        const pageCount = extractPageNumberFromUrl(lastChapterUrl);

        const responseLastPage = await axios.get(lastChapterUrl);
        const $lastPage = cheerio.load(responseLastPage.data);
        const chaptersCountInLastPage = $lastPage('ul.list-chapter li').length;

        totalChapters = (pageCount - 1) * PER_PAGE + chaptersCountInLastPage;

        // console.log({ pageCount, lastChapterUrl, chaptersCountInLastPage, totalChapters });
      } else if (maxPageLink.length > 0) {
        const maxPageUrl = new URL(maxPageLink.attr('href'), normalizedUrl).toString();
        const pageCount = extractPageNumberFromUrl(maxPageUrl);

        const responseMaxPage = await axios.get(maxPageUrl);
        const $maxPage = cheerio.load(responseMaxPage.data);
        const chaptersCountInMaxPage = $maxPage('ul.list-chapter li').length;

        totalChapters = (pageCount - 1) * PER_PAGE + chaptersCountInMaxPage;
        // console.log({ pageCount, maxPageUrl, chaptersCountInMaxPage, totalChapters });
      } else {
        totalChapters = $('ul.list-chapter li').length;
        // console.log({ totalChapters });
      }

      stream.write(`${title};${author};${ratingValue};${ratingCount};${totalChapters};${normalizedUrl};${genres.sort().join("| ")}\n`)

      visitedPostsUrl.add(normalizedUrl);
    } catch (error) {
      // handle any error that occurs during the HTTP request
      console.error(`Error fetching ${normalizedUrl}: ${error.message}`);
    }
  }

  stream.end();
};

module.exports = { crawlPosts };