function caseCompare(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase();
}

function ignoreCaseCompare(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase();
}

module.exports = { caseCompare, ignoreCaseCompare };
