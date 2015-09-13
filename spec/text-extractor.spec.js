'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var extract = require('../lib/text-extractor');

describe('Text Extractor', function() {
  it('extracts text from UTF-8 html documents', function() {
    var input = loadExample('51242_54045.utf8.html');
    var output = extract(input);
    expect(output).to.contain('吉井勇');
    expect(output).not.to.contain('<br />');
  });

  it('skips script tags', function() {
    var input = loadExample('scripts.html');
    var output = extract(input);
    expect(output).to.equal('Text');
  });
});

function loadExample(name) {
  return fs.readFileSync(__dirname + '/resources/' + name);
}
