'use strict';

var request = require('superagent');

var convertEncoding = require('./lib/encoding-converter');
var extractText = require('./lib/text-extractor');

exports.scrape = function scrape(htmlContent, contentType) {
  var html = convertEncoding(htmlContent, contentType);
  return extractText(html);
};

exports.scrapeURL = function scrapeURL(url, cb) {
  request
    .get(url)
    .parse(function(res, done) {
      res.text = '';
      res.setEncoding('binary');
      res.on('data', function(chunk) { res.text += chunk; });
      res.on('end', function() {
        res.text = new Buffer(res.text, 'binary');
        done();
      });
    })
    .end(function(err, res) {
      if (err) return cb(err, null);

      try {
        var html = convertEncoding(res.text, res.headers['content-type']);
        cb(null, extractText(html));
      } catch (error) {
        cb(error, null);
      }
    });
};
