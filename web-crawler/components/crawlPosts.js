const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { once } = require("events");
const { normalizeUrl } = require("../utils/normalizeUrl");
const { getDateTime } = require("../utils/getDateTime");

const LIMIT_POSTS_TO_CRAWL = 1000;
const CHAPTERS_PER_PAGE = 50;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const extractPageNumberFromUrl = (url) => {
  const match = url.match(/trang-(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
};

const escapeCsvValue = (value) => {
  const text = String(value ?? "");
  return /[;\n"]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const getTotalChapters = async ($, normalizedUrl) => {
  const currentPageCount = $("ul.list-chapter li").length;
  const paginationPage = $('ul.pagination li a:has(.arrow)').first().attr("href")
    || $('ul.pagination li a:not(:has(.sr-only))').last().attr("href");

  if (!paginationPage) {
    return currentPageCount;
  }

  const lastPageUrl = new URL(paginationPage, normalizedUrl).toString();
  const pageNumber = extractPageNumberFromUrl(lastPageUrl);
  if (!pageNumber) {
    return currentPageCount;
  }

  const response = await axios.get(lastPageUrl);
  const $lastPage = cheerio.load(response.data);
  const chaptersOnLastPage = $lastPage("ul.list-chapter li").length;
  return (pageNumber - 1) * CHAPTERS_PER_PAGE + chaptersOnLastPage;
};

const crawlPosts = async (urls = []) => {
  const postsUrlToVisit = [...urls];
  const visitedPostUrls = new Set();
  let requestsUntilPause = Math.floor(Math.random() * 10) + 5;
  const filePath = `posts-${getDateTime()}.csv`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "Title;Author;Rate;Count;Total Chapters;Url;Genres\n");
  }
  const stream = fs.createWriteStream(filePath, { flags: "a" });

  try {
    while (postsUrlToVisit.length > 0 && visitedPostUrls.size < LIMIT_POSTS_TO_CRAWL) {
      const normalizedUrl = normalizeUrl(postsUrlToVisit.shift());
      if (!normalizedUrl || visitedPostUrls.has(normalizedUrl)) {
        continue;
      }

      visitedPostUrls.add(normalizedUrl);

      try {
        if (requestsUntilPause <= 0) {
          console.log("Waiting 15 seconds before continuing post crawl...");
          await delay(15000);
          requestsUntilPause = Math.floor(Math.random() * 10) + 5;
        }

        requestsUntilPause--;
        console.log(`Visiting post ${normalizedUrl}`);
        const response = await axios.get(normalizedUrl);
        const $ = cheerio.load(response.data);
        const genres = $('.info a[itemprop="genre"]')
          .map((_, link) => link.attribs.title)
          .get()
          .filter(Boolean)
          .sort();

        const row = [
          $('h3.title[itemprop="name"]').text().trim(),
          $('.info a[itemprop="author"]').text().trim(),
          $('.rate span[itemprop="ratingValue"]').text().trim(),
          $('.rate span[itemprop="ratingCount"]').text().trim(),
          await getTotalChapters($, normalizedUrl),
          normalizedUrl,
          genres.join("| "),
        ].map(escapeCsvValue).join(";");

        if (!stream.write(`${row}\n`)) {
          await once(stream, "drain");
        }
      } catch (error) {
        console.error(`Error fetching post ${normalizedUrl}: ${error.message}`);
      }
    }
  } finally {
    stream.end();
    await once(stream, "finish");
  }
};

module.exports = { crawlPosts, extractPageNumberFromUrl, escapeCsvValue, getTotalChapters };