var Diary = {
  init: function(){
    $('#nav_diary').click(function(){
      $('#nav_diary .badge').remove();
      localStorage.readAt = Date.now() / 1000 | 0;
    });

    $.getJSON('http://api.tumblr.com/v2/blog/tjdict.tumblr.com/posts/text?limit=2&api_key=iHO7TdNCbHVBhTaAu2Yo7G7Mk5bNq9yZxGXg7ZIHoJPloNbYUS&' + Date.now())
      .done(function(data){
        var $body = $('#modal_diary .modal-body'), newPostNumber = 0;
        for(var i in data.response.posts){
          var post = data.response.posts[i];
          if(parseInt(localStorage.readAt || 0) < post.timestamp) newPostNumber++;
          var content = '<div class="page-header"><h3><span class="glyphicon glyphicon-fire"></span> ' +
            post.title + ' <small>發表於 <a href="' + post.post_url + '" target="_blank">' +
            post.date.match(/\d+-\d+-\d+/) + '</a></small></h3></div>' + post.body.replace(/<table>/g, '<table class="table table-condensed table-bordered">')
          $body.append(content);
        }
        Diary.showBadge(newPostNumber);
      });
  },

  showBadge: function(number){
    if(number > 0)
      $('#nav_diary').append(' <span class="badge">' + (number > 9 ? '!' : number) + '</span>');
  }
}