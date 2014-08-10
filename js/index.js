$('[data-toggle="tooltip"]').tooltip();
(function(){
  // query
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus();
  for(var i in DICTIONARIES){
    $('#dict-list').append('<li>' + DICTIONARIES[i].title + '</li>');
    DICTIONARIES[i].query(queryString, function(dictionary, result){
      $('#main').append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
      $('#main').append(result);
    });
  }
})();