var Logger = {
  init: function(){
    Logger.setFirebase();
    $('[data-track-click]').click(Logger.onTrackClick);
  },

  setFirebase: function() {
    if(isProduction())
      Logger.firebase = new Firebase('https://tjdict.firebaseio.com');
    else
      Logger.firebase = new Firebase('https://tjdict.firebaseio.com/dev');
  },

  onTrackClick: function(e){
    var self = this;
    chrome.identity.getProfileUserInfo(function(info){
      var pushData = {
        click: self.dataset.trackClick,
        timestamp: Logger.timestamp(),
        uid: info.id
      };
      Logger.firebase.child('clicks').push(pushData);
    });
  },

  timestamp: function() {
    return Date.now() / 1000 | 0;
  },

  record: function(query_string, url){
    try{
      chrome.identity.getProfileUserInfo(function(info){
        $.get('http://freegeoip.net/json', function(data){
          var push_data = {
            ip: data.ip,
            url: url,
            query: query_string,
            timestamp: Logger.timestamp(),
            uid: info.id
          }
          if(typeof(url) === 'undefined') delete push_data.url;
          Logger.firebase.child('tracks').push(push_data);
        });
      });
    }catch(err){
      console.error(err.message);
    }
  }
}