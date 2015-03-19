(function(){
  for(var i in DICTIONARIES) DICTIONARIES[i].id = i; // for reflection
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus().select();
  if(queryString && !queryString.match(/TJDict/i)){
    $('#dict_nav').show();
    var matchedLanguages = []; // 判斷查詢的字可能是什麼語言
    for(var i in LANG_MATCHER) if(queryString.match(LANG_MATCHER[i])) matchedLanguages.push(i);
    chrome.storage.sync.get(DEFAULT_OPTIONS, function(items){
      for(var i in items.order){
        var dictName = items.order[i];
        if(DICTIONARIES[dictName] /*字典存在*/ && items[dictName] /*啟用*/){
          var isLangFound = false;
          for(var j in matchedLanguages)
            if(!!~DICTIONARIES[dictName].langs.indexOf(matchedLanguages[j])){
              isLangFound = true; break;
            }
          if(!isLangFound) continue; // 如果找不到符合語言就跳過該字典
          var id = 'dict_' + dictName;
          $('#main').append('<div id="' + id + '"></div>');
          $('#dict_nav_ul').append('<li id="dict_nav_li_' + dictName + '"' + (i == 0 ? ' class="active"' : undefined) + '></li>')
          DICTIONARIES[dictName].query(queryString, function(dictionary, result){
            if(!result) return; // 沒結果就不要顯示內容與導覽列
            var id = '#dict_' + dictionary.id;
            $('#dict_nav_li_' + dictionary.id).append('<a href="' + id + '">' + dictionary.title + '</a></li>');
            $(id).append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
            $(id).append(result);
          });
        }
      }
    });
    // 音標 BEGIN
    if($.inArray('en', matchedLanguages) > -1){
      $.get('http://tw.dictionary.search.yahoo.com/search?p=' + queryString).done(function(data){
        var children = $(data).find('.proun_wrapper').children();
        var text = children[0].innerText + ' ' + children[1].innerText;
        $('#tts').tooltip({title: text, placement: 'left'});
      });
    }
    // 音標 END
    // 聲音 BEGIN
    // 顯示聲音選項，指定 id="tts_語言"
    for(var i in matchedLanguages)
      $('#tts_list').append('<li data-lang="' + matchedLanguages[i] + '"><a href="#">' + TRANSLATION[matchedLanguages[i]] + '</a></li>');
    $('#tts_list > li:first').addClass('active');
    if(matchedLanguages.length > 1) $('#lang_dropdown').show();
    $('#tts_list > li').click(function(event){
      $('#tts_list > li').removeClass('active');
      $(this).addClass('active');
    });
    $('#tts').removeClass('disabled').click(function(event){
      var lang = $('#tts_list > li.active').data('lang')
      if(lang == 'en') lang = 'en-US'; // Use en-US as English TTS
      chrome.tts.speak($('#q').val(), {lang: lang});
    }).click();
    // 聲音 END
  }else $('#intro').show();
  // 記錄視窗大小
  chrome.runtime.sendMessage({op: 'resize?'}, function(resize){ // runtime 不知道自己的 window ID
    if(resize)
      window.onresize = function(event){
        chrome.storage.local.set({width: window.innerWidth, height: window.innerHeight});
      };
  });
  // 顯示版本
  var current_version = chrome.runtime.getManifest().version;
  $('.version').text(current_version);
  // options
  if(location.hash == '#options') $('#modal_setting').modal('show');
})();