$('[data-toggle="tooltip"]').tooltip();
(function(){
  // query
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus();
  for(var i in DICTIONARIES){
    // query
    DICTIONARIES[i].query(queryString, function(dictionary, result){
      $('#main').append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
      $('#main').append(result);
    });
    // #modal_about
    $('#dict-list').append('<li>' + DICTIONARIES[i].title + '</li>');
    // #modal_setting
    $('#dict_checkboxes').append('<div class="checkbox"><label><input id="' + i + '" name="' + i + '" type="checkbox"> ' + DICTIONARIES[i].title + '</label></div>');
  }
})();