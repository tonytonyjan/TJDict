function record_query(query_string, url){
  try{
    $.get('http://freegeoip.net/json', function(data){
      var push_data = {
        ip: data.ip,
        url: url,
        query: query_string,
        timestamp: (Date.now() / 1000 | 0)
      }
      if(typeof(url) === 'undefined') delete push_data.url;
      var ref = new Firebase('https://tjdict.firebaseio.com/tracks');
      ref.push(push_data);
    });
  }catch(err){
    console.error(err.message);
  }
}

var urlParams;
(window.onpopstate = function(){
  var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);

  urlParams = {};
  while(match = search.exec(query)) urlParams[decode(match[1])] = decode(match[2]);
})();