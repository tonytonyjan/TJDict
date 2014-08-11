DICTIONARIES.jukuu = {
  title: "句酷雙語例句",
  query: function(q, response){
    var self = this;
    $.get('http://www.jukuu.com/search.php?q=' + q).done(function(data){
      var trs1 = $(data).find('tr.e td:nth-child(2)');
      var trs2 = $(data).find('tr.c td:nth-child(2)');
      var result = "<ul>";
      for(var i = 0; i < trs1.length; i++){
        result += "<li>" +
        "<p>" + trs1[i].innerHTML + "</p>" +
        "<p style='color:blue'>" + trs2[i].innerHTML + "</p>" +
        "</li>";
      }
      result += "</ul>";
      response(self, result);
    });
  }
}