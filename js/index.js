var Index = {
  init: function(){
    Index.recordWindowSize();
    Index.showVersion();
    Index.focusField();
    Index.showSettings();
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
    $('#q').val(Index.queryString()).focus().select();
  },

  showSettings: function(){
    if(location.hash == '#options') $('#modal_setting').modal('show');
  }
};

Options.init();
Search.init();
KK.init();
TTS.init();
Index.init();
Donate.init();