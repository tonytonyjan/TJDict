TJDict.engines.push({
  title: "Yahoo 字典",
  url: function(q){return "http://hk.dictionary.yahoo.com/dictionary?p=" + q},
  resault: function(data){
    var body = $(TJDict.grepBody(data));
    
    var defs = body.find('.def.clr.nobr');
    var resault = "";
    defs.each(function(i ,v){
      resault += "<h3>" + $(v).children('.caption').text() + "</h3>";
      resault += $(v).children('.list').html();
    });
    return resault;
  }
});