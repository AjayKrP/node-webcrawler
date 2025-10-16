const htmlDownloaderService = require("./htmlDownloader.service");
const linkExtractor = require("./linkExtractor.service");

async function addSeed(url) {
  try {
    const links = await linkExtractor.crawl(url, url);
    return { url, links };
  } catch (error) {
    throw new Error("Failed to add seed: " + error.message);
  }
}

module.exports = { addSeed };
