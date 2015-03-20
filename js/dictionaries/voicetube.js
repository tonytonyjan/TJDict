DICTIONARIES.voicetube = {
  title: 'VoiceTube',
  desc: '英中',
  langs: ['en'],
  query: function(q, response){
    var self = this;
    $.getJSON('https://tw.voicetube.com/definition/' + q, {format: 'json'}, function(data){
      s = '';
      for(var i in data.videos){
        var video = data.videos[i];
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
            s += '<li><a href="' + video_url + '/' + video.captions_id[j] + '/?word=' + q + '">' + caption + '</a><br>' + caption_zh + '</li>'
          }
        s += '</ol></div></div>'
      }
      response(self, data.translate.replace(/<\/a>/g, '').replace(/<a[^>]*>/g, '') + s);
    });
  }
};