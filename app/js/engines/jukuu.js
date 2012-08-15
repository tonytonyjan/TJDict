TJDict.engines.push({
  title: "句酷雙語例句",
  url: function(q){return "http://www.jukuu.com/search.php?q=" + q},
  resault: function(data){
    var regex = /<body[^>]*>([\S\s]*)<[^<]*body>/;
    var matches = regex.exec(data);
    matches[1] = matches[1].replace(/(<\s*img+)(\s*[^>]*\s*)(>)/ig, "$1$3");
    var body = $(matches[1]);
    var trs1 = body.find('tr.e td:nth-child(2)');
    var trs2 = body.find('tr.c td:nth-child(2)');
    var resault = "<ul>";
    for(var i = 0; i < 10; i++){
      resault += "<li>" +
      "<p>" + trs1[i].innerHTML + "</p>" +
      "<p style='color:blue'>" + trs2[i].innerHTML + "</p>" +
      "</li>";
    }
    resault += "</ul>";
    return resault;
  }
});
