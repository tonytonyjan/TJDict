var KK = {
  init: function(){
    var queryString = Index.queryString();
    if(!Search.validQuery()) return;
    var matchedLanguages = Search.matchedLanguages();
    if($.inArray('en', matchedLanguages) > -1){
      $.get('http://tw.dictionary.search.yahoo.com/search?p=' + queryString).done(function(data){
        var children = $(data).find('.proun_wrapper').children();
        var text = children[0].innerText + ' ' + children[1].innerText;
        $('#tts').tooltip({title: text, placement: 'left'});
      });
    }
  }
}