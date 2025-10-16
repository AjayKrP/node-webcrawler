const { URL } = require("url");
const htmlDownloaderService = require("./htmlDownloader.service");
const { ignoreCaseCompare } = require("../utils/string.utils");
const { ignorePathToCrawl } = require("./urlFilter.service");

const globalUrls = new Set();

async function extractLinks(url) {
  const urls = new Set();
  const base = new URL(url);

  // Download HTML
  const htmlContent = await htmlDownloaderService.downloadHtml(url);
  const htmlString = htmlContent.toString();

  // Extract all absolute URLs
  const absoluteUrlRegex =
    /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[\/?#][^\s"'<>]*)?/g;
  const absoluteMatches = htmlString.match(absoluteUrlRegex) || [];
  absoluteMatches.forEach((link) => urls.add(cleanUrl(link)));

  // Extract from src/href (handles relative and absolute)
  const srcHrefRegex = /(src|href)=["']([^"']+)["']/g;
  let match;
  while ((match = srcHrefRegex.exec(htmlString)) !== null) {
    const foundUrl = match[2];
    try {
      const resolvedUrl = new URL(foundUrl, base).href;
      urls.add(cleanUrl(resolvedUrl));
    } catch (err) {
      // Ignore invalid URLs like "javascript:void(0)"
    }
  }

  return Array.from(urls);
}

function cleanUrl(rawUrl) {
  try {
    const u = new URL(rawUrl);
    u.hash = ""; // remove fragment
    if (u.pathname !== "/" && u.pathname.endsWith("/")) {
      u.pathname = u.pathname.slice(0, -1);
    }
    return u.href;
  } catch {
    return rawUrl;
  }
}

async function crawl(host, startUrl) {
  const queue = [startUrl];
  const hostName = new URL(host).hostname;

  while (queue.length > 0) {
    if (globalUrls.size >= 100) break;

    const currentUrl = queue.shift();

    if (globalUrls.has(currentUrl)) continue;
    if (ignorePathToCrawl(currentUrl)) continue;

    const currentHost = new URL(currentUrl).hostname;
    if (!ignoreCaseCompare(hostName, currentHost)) continue;

    globalUrls.add(currentUrl);
    console.log("Crawling:", currentUrl);

    try {
      const localLinks = await extractLinks(currentUrl);
      for (const link of localLinks) {
        if (!globalUrls.has(link)) {
          queue.push(link);
        }
      }
    } catch (err) {
      console.error("Error fetching:", currentUrl, err.message);
    }
  }

  return Array.from(globalUrls);
}

module.exports = { crawl };
