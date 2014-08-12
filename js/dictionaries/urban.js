DICTIONARIES.urban = {
  title: 'Urban Dictionary',
  langs: ['en'],
  query: function(q, response){
    var self = this;
    $.get('http://www.urbandictionary.com/define.php?term=' + q).done(function(data){
      var result = '';
      $(data).find('.box > div.inner').each(function(index, element){
        console.log(element);
        var word = $(element).find('.word').text();
        var meaning = $(element).find('.meaning').html();
        var example = $(element).find('.example').html();
        console.log(word);
        result += '<div class="panel panel-info">\
          <div class="panel-heading">\
            <h3 class="panel-title">' + word + '</h3>\
          </div>\
          <div class="panel-body">' + meaning + '</div>\
          <div class="panel-footer">' + example + '</div>\
        </div>';
      });
      response(self, result);
    });
  }
};