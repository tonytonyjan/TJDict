DICTIONARIES.voicetube = {
  title: 'VoiceTube',
  desc: '英中',
  langs: ['en'],
  query: function(q, response){
    var self = this;
    $.getJSON('https://tw.voicetube.com/definition/' + q, {format: 'json'}, function(data){
      s = '';
      var keys = [];
      for(var key in data.videos) keys.push(key);
      keys = keys.sort().reverse().slice(0, 3);
      var videos = []
      for(var i in keys) videos.push(data.videos[keys[i]]);
      for(var i in videos){
        var video = videos[i];
        var video_url = 'https://tw.voicetube.com/videos/' + video.info.id;
        s += '<div class="media"><div class="media-left">' +
          '<a href="' + video_url + '" target="_blank">' +
            '<img class="media-object" src="https://cdn.voicetube.com/assets/thumbnails/' + video.info.youtube + '.jpg" height="100px" >' +
          '</a>' +
        '</div>' +
        '<div class="media-body">' +
          '<h4 class="media-heading">' + video.info.title + '</h4><ol>';
          for(var j in video.captions){
            var caption = video.captions[j];
            var caption_zh = video.captions_zh[j];
            s += '<li><a href="' + video_url + '/' + video.captions_id[j] + '/?word=' + q + '" target="_blank">' + caption + '</a><br>' + caption_zh + '</li>'
          }
        s += '</ol></div></div>'
      }
      response(self, data.translate.replace(/<\/a>/g, '').replace(/<a[^>]*>/g, '') + s);
    });
  }
};