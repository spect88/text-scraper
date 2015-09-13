# text-scraper

A tool for easy scraping of text content from HTML documents of arbitrary
encoding.

### Installation

```shell
npm install text-scraper
# or if you only need the shell command:
npm install -g text-scraper
```

### Usage

Node:

```javascript
var textScraper = require('text-scraper');

textScraper.scrapeURL('http://www.bbc.co.uk', function(err, res) {
  console.log(res);
});
// or

var document = new Buffer('<h1>text</h1>', 'binary');
textScraper.scrape(document, 'text/html');
```

Command line:

```shell
text-scraper 'http://en.wikipedia.org'
```

### License

The code is available under [MIT license](LICENSE).
