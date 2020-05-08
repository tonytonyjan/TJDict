var Index = {
  init: function(){
    Index.recordWindowSize();
    Index.showVersion();
    Index.focusField();
    Index.showModals();
  },

  queryString: function(){
    return urlParams.q ? urlParams.q.trim() : '';
  },

  recordWindowSize: function(){
    chrome.runtime.sendMessage({op: 'resize?'}, function(resize){ // runtime 不知道自己的 window ID
      if(resize)
        window.onresize = function(event){
          chrome.storage.local.set({width: window.innerWidth, height: window.innerHeight});
        };
    });
  },

  showVersion: function(){
    var current_version = chrome.runtime.getManifest().version;
    $('.version').text(current_version);
  },

  focusField: function(){
    var q = document.getElementById('q');
    q.value = Index.queryString();
    q.setSelectionRange(0, q.value.length)
  },

  showModals: function(){
    if(location.hash == '#options') $('#modal_setting').modal('show');
    $('.modal').each(function(index, element){
      var id = '#' + element.id;
      if(location.hash == id) $(id).modal('show');
    });
  }
};

Options.init();
Search.init();
KK.init();
TTS.init();
Donate.init();
Typeahead.init();
Diary.init();
Index.init();