DICTIONARIES.nciku = {
  title: '詞酷線上辭典',
  desc: '英中、中英',
  langs: ['zh', 'en'],
  query: function(q, response){
    var self = this;
    $.get('http://www.nciku.com.tw/mini/all/' + q).done(function(data){
      var def = $(data).find('dl > dd > ol');
      def.find('li > div > strong:first-child').remove();
      var result = '<h3>釋義</h3>';
      if(def[0]) result += def[0].outerHTML;
      var wordList = $(data).find('div.ex_box > ul.word_list');
      if(wordList[0]) result += wordList[0].outerHTML;
      if(wordList.length == 0) result = false;
      response(self, result);
    });
  }
};