const dns = require("dns");

async function resolveDns(url) {
  return new Promise((resolve, reject) => {
    dns.resolve(url, (err, addresses) => {
      if (err) {
        reject(err);
      }
      resolve(addresses);
    });
  });
}

module.exports = { resolveDns };
