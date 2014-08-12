(function(){
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus();
  if(queryString)
    chrome.storage.sync.get(DEFAULT_OPTIONS, function(items){
      for(var i in items.order){
        var dictName = items.order[i];
        if(DICTIONARIES[dictName] /*字典存在*/ && items[dictName] /*啟用*/){
          $('#main').append('<div data-title="' + DICTIONARIES[dictName].title + '"></div>');
          DICTIONARIES[dictName].query(queryString, function(dictionary, result){
            $('[data-title="' + dictionary.title + '"]').append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
            $('[data-title="' + dictionary.title + '"]').append(result);
          });
        }
      }
    });
  // 記錄視窗大小
  window.onresize = function(event){
    chrome.storage.local.set({width: window.innerWidth, height: window.innerHeight});
  };
  // 顯示本次更新
  var current_version = chrome.runtime.getManifest().version;
  $('#update_title').append(' ' + current_version);
  for(var i in CHANGELOG)
    $('#update_list').append('<li><b>' + CHANGELOG[i].title + '</b> ' + CHANGELOG[i].message + '</li>');
})();