DICTIONARIES.push({
  title: 'Yahoo 字典',
  query: function(q, response){
    var self = this;
    $.get('http://tw.dictionary.search.yahoo.com/search?p=' + q).done(function(data){
      response(self, $(data).find('.explanation_wrapper')[0]);
    });
  }
});