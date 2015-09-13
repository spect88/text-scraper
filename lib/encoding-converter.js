'use strict';

var jschardet = require('jschardet');
var charset = require('charset');
var iconv = require('iconv-lite');

function detectEncoding(content, contentType) {
  var byMetaAndContentType = charset({'content-type': contentType}, content);
  if (byMetaAndContentType) return byMetaAndContentType;

  var byGuessing = jschardet.detect(content);
  if (byGuessing && byGuessing.encoding) return byGuessing.encoding;

  return 'UTF-8';
}

module.exports = function encodingConverter(content, contentType) {
  var encoding = detectEncoding(content, contentType);

  if (encoding === 'UTF-8') return content;

  return iconv.decode(content, encoding);
};
