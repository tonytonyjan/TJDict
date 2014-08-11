$('[data-toggle="tooltip"]').tooltip();
(function(){
  // query
  var queryString = urlParams.q ? urlParams.q.trim() : '';
  $('#q').val(queryString).focus();
  if(queryString)
    chrome.storage.sync.get(null, function(items){
      for(var i in items)
        if(DICTIONARIES[i] && items[i])
          DICTIONARIES[i].query(queryString, function(dictionary, result){
            $('#main').append('<div class="page-header"><h2>' + dictionary.title + '</h2></div>');
            $('#main').append(result);
          });
    });
  for(var i in DICTIONARIES){
    // #modal_about
    $('#dict-list').append('<li>' + DICTIONARIES[i].title + '</li>');
    // #modal_setting
    $('#dict_checkboxes').append('<div class="checkbox"><label><input id="' + i + '" name="' + i + '" type="checkbox"> ' + DICTIONARIES[i].title + '</label></div>');
  }
})();