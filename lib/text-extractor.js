'use strict';

var cheerio = require('cheerio');

function collapseWhitespace(str) {
  return str
    .replace(/\s*[\r\n]\s*/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

module.exports = function textExtractor(html) {
  var $ = cheerio.load(html);
  $('script').remove();
  $('style').remove();
  var text = $.root().text();
  return collapseWhitespace(text);
};
