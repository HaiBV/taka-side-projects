const normalizeUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.search = "";
    parsedUrl.hash = "";

    if (parsedUrl.pathname.endsWith("/")) {
      parsedUrl.pathname = parsedUrl.pathname.slice(0, -1);
    }

    return parsedUrl.toString();
  } catch (e) {
    console.error(`Error normalizing URL: ${e.message}`);
    return null;
  }
};

module.exports = { normalizeUrl };