DICTIONARIES.weblio = {
  title: "Weblio",
  desc: '日日',
  langs: ['ja'],
  query: function(q, response){
    var self = this;
    $.get("http://www.weblio.jp/content/" + q).done(function(data){
      var titles = $(data).find('.pbarTL');
      var contents = $(data).find('.kiji');
      var minSize = titles.size() < contents.size ? titles.size() : contents.size();
      var reg = /www\.weblio\.jp\/content\/(.*)/;
      $(contents).find('a').each(function(key, value){
        var match = reg.exec(value.href);
        if(match)
          value.href = 'index.html?q=' + match[1];
      });
      var result = "";
      for(var i = 0; i < minSize; i++){
        result += '<h3>' + titles[i].innerText + '</h3>';
        result += contents[i].innerHTML;
      }
      response(self, result);
    });
  }
};