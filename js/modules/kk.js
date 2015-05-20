var KK = {
  init: function(){
    var queryString = Index.queryString();
    if(!Search.isValidQuery()) return;
    var matchedLanguages = Search.matchedLanguages();
    if($.inArray('en', matchedLanguages) > -1){
      $.get('http://tw.dictionary.search.yahoo.com/search?p=' + queryString).done(function(data){
        $('#tts').tooltip({title: $(data).find('#pronunciation_pos').text(), placement: 'left'});
      });
    }
  }
}