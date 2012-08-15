TJDict.engines.push({
  title: "海詞在線辭典",
  url: function(q){return "http://dict.cn/" + q},
  resault: function(data){
    var regex = /<body[^>]*>([\S\s]*)<[^<]*body>/;
    var matches = regex.exec(data);
    matches[1] = matches[1].replace(/(<\s*img+)(\s*[^>]*\s*)(>)/ig, "$1$3");
    var body = $(matches[1]);
    var def = body.find('div.cont-one.shiyi > p');
    var resault = "<h3>釋義</h3>";
    def.each(function(){
      resault += this.outerHTML;
    });
    resault += "<h3>例句</h3>";
    var ex = body.find('div#exam-block0 div.h_bg.clearFix');
    resault += "<ul>";
    ex.each(function(){
      var p = $(this).find('p');
      p.find('strong').remove();
      var en = p[0].innerText;
      var zh = p[1].innerText;
      resault += "<li>" +
              "<p>" + en + "</p>" +
              "<p style='color:blue'>" + zh + "</p>" + "</li>"
    });
    resault += "</ul>";
    return resault;
  }
});