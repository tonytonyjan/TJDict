TJDict = {
  query: function(q){
    for(var i in this.engines){
      $.ajax({
        url: TJDict.engines[i].url(q),
        ajaxI: i
      }).done(function(data){
        var title = "<div class='page-header'><h2>" + 
                  TJDict.engines[this.ajaxI].title +
                  "</h2></div>";
        var resault = TJDict.engines[this.ajaxI].resault(data);
        $('#container').append(title + resault);
      });
    }
  },
  engines: []
}