DICTIONARIES.voicetube = {
  title: 'VoiceTube',
  desc: '英中',
  langs: ['en'],
  query: function(q, response){
    var self = this;
    $.getJSON('https://tw.voicetube.com/definition/' + q, {format: 'json'}, function(data){
      response(self, data.translate.replace(/<\/a>/g, '').replace(/<a[^>]*>/g, ''));
    });
  }
};