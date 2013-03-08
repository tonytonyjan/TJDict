TJDict.engines.push({
  title: "Weblio（日文）",
  lang: 'jp',
  url: function(q){return "http://www.weblio.jp/content/" + q},
  resault: function(data){
    var body = $(TJDict.grepBody(data));
    var titles = body.find('.pbarTL');
    var contents = body.find('.kiji');
    var minSize = titles.size() < contents.size ? titles.size() : contents.size();
    var reg = /www\.weblio\.jp\/content\/(.*)/;
    $(contents).find('a').each(function(key, value){
      var match = reg.exec(value.href);
      if(match)
        value.href = 'index.html?q=' + match[1];
    });
    var result = ""
    for(var i = 0; i < minSize; i++){
      result += '<h3>' + titles[i].innerText + '</h3>';
      result += contents[i].innerHTML;
    }
    return result;
  }
});