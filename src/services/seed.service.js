const htmlDownloaderService = require('./htmlDownloader.service');
const linkExtractor = require('./linkExtractor.service');

async function addSeed(url) {
    try {
        const htmlContent = await htmlDownloaderService.downloadHtml(url);
        const links = linkExtractor.extractLinks(htmlContent);
        return { url,links, htmlContent };
    } catch (error) {
        throw new Error('Failed to add seed: ' + error.message);
    }
}

module.exports = { addSeed };