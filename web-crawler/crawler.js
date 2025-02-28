const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const { normalizeUrl } = require("./utils/normalizeUrl");
const { getDateTime } = require("./utils/getDateTime");

// define a crawler function
const crawler = async () => {
  const categoriesUrlToVisit = ["https://truyenfull.vision/the-loai/trong-sinh/hoan/"];
  // const categoriesUrlToVisit = [];
  const visitedCategoriesUrl = new Set();

  const postsUrlToVisit = [];
  // const postsUrlToVisit = ["https://truyenfull.vision/trong-sinh-nu-thay-phong-thuy-thien-son-tra-tan-quan/"];
  const visitedPostsUrl = new Set();

  let maxCrawlLength = Math.floor(Math.random() * 10) + 5;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // check if a page has already been crawled
  const checkIfCrawled = async (url) => {
    // implement your database query here to check if the page has already been crawled
    // return true if the page has been crawled, false otherwise
    return visitedCategoriesUrl.has(url);
  };

  // save the page to the database
  const handleResponse = async (url, response) => {
    // implement your database query here to save the page to the database
    // parse the HTML content using a library like cheerio
    const $ = cheerio.load(response.data);

    // extract and follow links from the HTML content
    const categoriesPageLink = $(".pagination li:not(.dropup) a[href]");

    for (const link of categoriesPageLink) {
      const absoluteLink = new URL(link.attribs.href, url).toString();
      categoriesUrlToVisit.push(absoluteLink);
    }

    const postsPageLink = $(
      ".list-truyen:not(.list-cat):not(.list-side) .row:not(#the-loai-show-ads) .truyen-title a[href]"
    );
    for (const link of postsPageLink) {
      const absoluteLink = normalizeUrl(new URL(link.attribs.href, url).toString());
      postsUrlToVisit.push(absoluteLink);
    }

    return null; // Placeholder for the saved page ID, remove this line and uncomment the above line to save the page ID

    // return a promise that resolves to the saved page ID
  };

  // mark a page as crawled
  const markAsCrawled = async (url) => {
    // implement your database query here to mark the page as crawled
    // return a promise that resolves to the saved page ID
    visitedCategoriesUrl.add(url);
  };

  while (categoriesUrlToVisit.length > 0) {
    const url = categoriesUrlToVisit.shift();
    // normalize the URL to remove any query parameters and trailing slash
    const normalizedUrl = normalizeUrl(url);

    try {
      // check if the URL has already been visited
      const isCrawled = await checkIfCrawled(normalizedUrl);
      if (!normalizedUrl || isCrawled) {
        // console.log(`${normalizedUrl} has already been visited. Skipping.`);
        continue;
      }

      // check if the maximum crawl length has been reached
      if (maxCrawlLength <= 0) {
        console.log("Waited 15s");
        await delay(15000);
        maxCrawlLength = Math.floor(Math.random() * 10) + 5;
        break;
      }

      maxCrawlLength--;
      console.log(`Visiting ${url}`);
      // fetch and parse the HTML content of the page
      const response = await axios.get(url);

      await handleResponse(url, response);

      await markAsCrawled(normalizedUrl);
    } catch (error) {
      // handle any error that occurs during the HTTP request
      console.error(`Error fetching ${normalizedUrl}: ${error.message}`);
    }
  }

  const filePath = `posts-${getDateTime()}.csv`;
  const header = "Title;Author;Genres;Rate;Count;Url\n";

  // Write header (only once)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header);
  }

  const stream = fs.createWriteStream(filePath, { flags: "a" });
  while (postsUrlToVisit.length > 0) {
    const url = postsUrlToVisit.shift();
    // normalize the URL to remove any query parameters and trailing slash
    const normalizedUrl = normalizeUrl(url);

    try {
      // check if the URL has already been visited
      if (!normalizedUrl || visitedPostsUrl.has(normalizedUrl)) {
        // console.log(`${normalizedUrl} has already been visited. Skipping.`);
        continue;
      }

      // check if the maximum crawl length has been reached
      if (maxCrawlLength <= 0) {
        console.log("Waited 15s");
        await delay(15000);
        maxCrawlLength = Math.floor(Math.random() * 10) + 5;
        break;
      }

      maxCrawlLength--;
      console.log(`Visiting ${url}`);
      // fetch and parse the HTML content of the page
      const response = await axios.get(url);

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

      stream.write(`${title};${author};${genres.join(", ")};${ratingValue};${ratingCount};${normalizedUrl}\n`)

      visitedPostsUrl.add(normalizedUrl);
    } catch (error) {
      // handle any error that occurs during the HTTP request
      console.error(`Error fetching ${normalizedUrl}: ${error.message}`);
    }
  }

  stream.end();
  console.log("CSV file has been successfully created!");
};

module.exports = { crawler };
