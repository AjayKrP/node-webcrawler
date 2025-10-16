function ignorePathToCrawl(url) {
  // TODO: Implement logic to ignore certain paths from robots.txt
  if (!url) return false;

  const ignoredPaths = [
    "/api",
    "/static",
    "/admin",
    "/cdn-cgi",
    "/wp-admin",
    "/wp-content",
  ];
  const urlPath = new URL(url).pathname;

  return ignoredPaths.some((path) => urlPath.includes(path));
}

module.exports = { ignorePathToCrawl };
