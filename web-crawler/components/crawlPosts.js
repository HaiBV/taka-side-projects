const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { once } = require("events");
const { normalizeUrl } = require("../utils/normalizeUrl");
const { getDateTime } = require("../utils/getDateTime");

const LIMIT_POSTS_TO_CRAWL = 1000;
const MIN_RATING = 7;
const MIN_CHAPTERS = 100;
const CHAPTERS_PER_PAGE = 50;
const INITIAL_FORBIDDEN_DELAY_MS = 1000;
const FORBIDDEN_DELAY_STEP_MS = 100;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomInteger = (min, max) => {
  const lowerBound = Math.ceil(min);
  const upperBound = Math.floor(max);
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
};

const extractPageNumberFromUrl = (url) => {
  const match = url.match(/trang-(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
};

const escapeCsvValue = (value) => {
  const text = String(value ?? "");
  return /[;\n"]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const shouldSavePost = (rating, totalChapters) => {
  const numericRating = Number.parseFloat(String(rating).replace(",", "."));
  return numericRating >= MIN_RATING && Number(totalChapters) >= MIN_CHAPTERS;
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
  const forbiddenRetries = new Map();
  let rowsWritten = 0;
  let requestsUntilPause = getRandomInteger(5, 15);
  let forbiddenDelayMs = INITIAL_FORBIDDEN_DELAY_MS;
  const filePath = `posts-${getDateTime()}.csv`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "Title;Author;Rate;Count;Total Chapters;Url;Genres\n");
  }
  const stream = fs.createWriteStream(filePath, { flags: "a" });

  try {
    while (
      postsUrlToVisit.length > 0 &&
      rowsWritten < LIMIT_POSTS_TO_CRAWL
    ) {
      const randomIndex = getRandomInteger(0, postsUrlToVisit.length - 1);
      const [url] = postsUrlToVisit.splice(randomIndex, 1);
      const normalizedUrl = normalizeUrl(url);
      if (!normalizedUrl || visitedPostUrls.has(normalizedUrl)) {
        continue;
      }

      try {
        if (requestsUntilPause <= 0) {
          console.log("Waiting 15 seconds before continuing post crawl...");
          await delay(15000);
          requestsUntilPause = getRandomInteger(5, 15);
        }

        requestsUntilPause--;
        console.log(`Visiting post ${normalizedUrl}`);
        const response = await axios.get(normalizedUrl);
        forbiddenRetries.delete(normalizedUrl);
        const $ = cheerio.load(response.data);
        const genres = $('.info a[itemprop="genre"]')
          .map((_, link) => link.attribs.title)
          .get()
          .filter(Boolean)
          .sort();

        const rating = $('.rate span[itemprop="ratingValue"]').text().trim();
        const totalChapters = await getTotalChapters($, normalizedUrl);
        if (!shouldSavePost(rating, totalChapters)) {
          visitedPostUrls.add(normalizedUrl);
          continue;
        }

        const row = [
          $('h3.title[itemprop="name"]').text().trim(),
          $('.info a[itemprop="author"]').text().trim(),
          rating,
          $('.rate span[itemprop="ratingCount"]').text().trim(),
          totalChapters,
          normalizedUrl,
          genres.join("| "),
        ].map(escapeCsvValue).join(";");

        visitedPostUrls.add(normalizedUrl);
        if (!stream.write(`${row}\n`)) {
          await once(stream, "drain");
        }
        rowsWritten++;
        if (rowsWritten >= LIMIT_POSTS_TO_CRAWL) {
          break;
        }
      } catch (error) {
        if (error.response?.status === 403) {
          console.warn(`HTTP 403 for ${normalizedUrl}; waiting ${forbiddenDelayMs / 1000}s...`);
          await delay(forbiddenDelayMs);
          forbiddenDelayMs += FORBIDDEN_DELAY_STEP_MS;

          const retryCount = forbiddenRetries.get(normalizedUrl) || 0;
          if (retryCount >= 1) {
            visitedPostUrls.add(normalizedUrl);
            forbiddenRetries.delete(normalizedUrl);
            console.warn(`Removed ${normalizedUrl} after its second HTTP 403 response.`);
            continue;
          }

          forbiddenRetries.set(normalizedUrl, retryCount + 1);
          postsUrlToVisit.push(normalizedUrl);
          continue;
        }
        visitedPostUrls.add(normalizedUrl);
        console.error(`Error fetching post ${normalizedUrl}: ${error.message}`);
      }
    }
  } finally {
    stream.end();
    await once(stream, "finish");
  }

  return { filePath, rowsWritten };
};

module.exports = {
  crawlPosts,
  extractPageNumberFromUrl,
  escapeCsvValue,
  getTotalChapters,
  shouldSavePost,
  getRandomInteger,
};