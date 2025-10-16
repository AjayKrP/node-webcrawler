const https = require("https");
const http = require("http");
const { URL } = require("url");

const protocolMapping = { http, https };

async function downloadHtml(url) {
  const parsedUrl = new URL(url);
  const protocol = parsedUrl.protocol.replace(":", "");
  if (!protocolMapping[protocol]) {
    throw new Error("Unsupported protocol: " + protocol);
  }
  return makeRequest(protocol, url);
}

function makeRequest(protocol, url) {
  return new Promise((resolve, reject) => {
    protocolMapping[protocol]
      .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports = { downloadHtml };
