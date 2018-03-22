DICTIONARIES.yahoo = {
  title: 'Yahoo 字典',
  desc: '英中、中英',
  langs: ['zh', 'en'],
  query: function(q, response){
    var self = this;
    $.get('http://tw.dictionary.search.yahoo.com/search?p=' + q).done(function(data){
      response(self, $(data).find('.tabsContent'));
    });
  }
};
