var Logger = {
  record: function(query_string, url){
    try{
      chrome.identity.getProfileUserInfo(function(info){
        $.get('http://freegeoip.net/json', function(data){
          var push_data = {
            ip: data.ip,
            url: url,
            query: query_string,
            timestamp: (Date.now() / 1000 | 0),
            uid: info.id
          }
          if(typeof(url) === 'undefined') delete push_data.url;
          if(isProduction()) var ref = new Firebase('https://tjdict.firebaseio.com/tracks');
          else var ref = new Firebase('https://tjdict.firebaseio.com/tracks_dev');
          ref.push(push_data);
        });
      });
    }catch(err){
      console.error(err.message);
    }
  }
}