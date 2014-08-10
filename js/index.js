$('[data-toggle="tooltip"]').tooltip();
(function(){
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus();
  for(var i in DICTIONARIES){
    DICTIONARIES[i].query(queryString, function(dictionary, result){
      $('#main').append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
      $('#main').append(result);
    });
  }
})();