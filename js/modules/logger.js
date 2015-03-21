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
            email: info.email,
            uuid: info.id
          }
          if(typeof(url) === 'undefined') delete push_data.url;
          var ref = new Firebase('https://tjdict.firebaseio.com/tracks');
          ref.push(push_data);
        });
      });
    }catch(err){
      console.error(err.message);
    }
  }
}