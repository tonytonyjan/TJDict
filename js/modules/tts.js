var TTS = {
  init: function(){
    var matchedLanguages = Search.matchedLanguages();
    if(!Search.isValidQuery()) return;
    // 顯示聲音選項，指定 id="tts_語言"
    for(var i in matchedLanguages)
      $('#tts_list').append('<li data-lang="' + matchedLanguages[i] + '"><a href="#">' + TRANSLATION[matchedLanguages[i]] + '</a></li>');
    chrome.storage.sync.get(DEFAULT_OPTIONS, function(items){
      if(matchedLanguages.length > 1){
        $('#lang_dropdown').show();
        $('#tts_list > li').each(function(i, li){
          if(li.dataset.lang == items.han_default_tts) li.className = 'active';
        });
      }else $('#tts_list > li:first').addClass('active');
      $('#tts_list > li').click(function(event){
        $('#tts_list > li').removeClass('active');
        $(this).addClass('active');
      });
      $('#tts').removeClass('disabled').click(function(event){
        var lang = $('#tts_list > li.active').data('lang')
        if(lang == 'en') lang = 'en-US'; // Use en-US as English TTS
        chrome.tts.speak($('#q').val(), {lang: lang});
      })
      if(items.auto_tts) $('#tts').click();
    });
  }
}