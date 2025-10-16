function extractLinks(htmlContent) {
    const urls = new Set();
    const linkRegex = /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[\/?#][^\s"'<>]*)?/g
    const allUrls =  htmlContent.toString().match(linkRegex);
    for (const url of allUrls) {
        urls.add(url);
    }
    return Array.from(urls);
}

module.exports = { extractLinks };