DICTIONARIES.oxford = {
  title: '牛津字典',
  desc: '英英',
  langs: ['en'],
  query: function(q, response){
    var self = this;
    var result = '';
    q = q.replace(/ /g, '-');
    $.get('http://www.oxforddictionaries.com/definition/english/' + q).done(function(data){
      response(self, $(data).find('.gramb'));
    });
  }
};
