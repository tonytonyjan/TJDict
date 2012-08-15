TJDict.engines.push({
  title: "詞酷線上辭典",
  url: function(q){return "http://www.nciku.com.tw/mini/all/" + q},
  resault: function(data){
    var regex = /<body[^>]*>([\S\s]*)<[^<]*body>/;
    var matches = regex.exec(data);
    matches[1] = matches[1].replace(/(<\s*img+)(\s*[^>]*\s*)(>)/ig, "$1$3");
    var body = $(matches[1]);
    
    var def = body.find('dl > dd > ol');
    def.find('li > div > strong:first-child').remove();
    var resault = "<h3>釋義</h3>";
    if(def[0]) resault += def[0].outerHTML;
    var wordList = body.find('div.ex_box > ul.word_list');
    //wordList.find('li > strong:first-child').remove();
    console.log(wordList);
    if(wordList[0]) resault += wordList[0].outerHTML;
    return resault;
  }
});