(function(){
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus().select();
  if(queryString && !queryString.match(/TJDict/i)){
    var matchedLanguages = []; // 判斷查詢的字可能是什麼語言
    for(var i in LANG_MATCHER) if(queryString.match(LANG_MATCHER[i])) matchedLanguages.push(i);
    chrome.storage.sync.get(DEFAULT_OPTIONS, function(items){
      for(var i in items.order){
        var dictName = items.order[i];
        if(DICTIONARIES[dictName] /*字典存在*/ && items[dictName] /*啟用*/){
          var isLangFound = false;
          for(var j in matchedLanguages)
            if(!!~DICTIONARIES[dictName].langs.indexOf(matchedLanguages[j])) isLangFound = true;
          if(!isLangFound) continue; // 如果找不到符合語言就跳過該字典
          $('#main').append('<div data-title="' + DICTIONARIES[dictName].title + '"></div>');
          DICTIONARIES[dictName].query(queryString, function(dictionary, result){
            $('[data-title="' + dictionary.title + '"]').append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
            $('[data-title="' + dictionary.title + '"]').append(result);
          });
        }
      }
    });
    // 聲音 BEGIN
    // 顯示聲音選項，指定 id="tts_語言"
    for(var i in matchedLanguages)
      $('#tts_list').append('<li data-lang="' + matchedLanguages[i] + '"><a href="#">' + TRANSLATION[matchedLanguages[i]] + '</a></li>');
    $('#tts_list > li:first').addClass('active');
    if(matchedLanguages.length <= 1) $('#lang_dropdown').hide();
    $('#tts_list > li').click(function(event){
      $('#tts_list > li').removeClass('active');
      $(this).addClass('active');
    });
    $('#tts').removeClass('disabled').click(function(event){
      var lang = $('#tts_list > li.active').data('lang')
      chrome.tts.speak($('#q').val(), {lang: lang});
    });
    // 聲音 END
  }else $('#intro').show();
  // 記錄視窗大小
  window.onresize = function(event){
    chrome.storage.local.set({width: window.innerWidth, height: window.innerHeight});
  };
  // 顯示本次更新
  var current_version = chrome.runtime.getManifest().version;
  $('#update_title').append(' ' + current_version);
  for(var i in CHANGELOG)
    $('#update_list').append('<li><b>' + CHANGELOG[i].title + '</b> ' + CHANGELOG[i].message + '</li>');
  // options
  if(location.hash == '#options') $('#modal_setting').modal('show');
})();