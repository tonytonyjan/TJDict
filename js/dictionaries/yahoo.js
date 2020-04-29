DICTIONARIES.yahoo = {
  title: 'Yahoo 字典',
  desc: '英中、中英',
  langs: ['zh', 'en'],
  query: function (q, response) {
    var self = this;
    fetch('https://tw.dictionary.search.yahoo.com/search?p=' + q)
      .then((response) => response.text())
      .then((body) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(body, 'text/html');
        response(self, doc.querySelector('.tabsContent-s'));
      });
  },
};
