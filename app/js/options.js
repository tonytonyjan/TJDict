function saveOptions(){
  var new_options = $('#options-form').serializeObject();
  chrome.storage.sync.set({options: new_options}, function(){
    $('#options-form').after(
      $('<div class="alert alert-success fade in" data-dismiss="alert">' +
        '已儲存' +
        '</div>')
      .fadeIn().delay(1000).fadeOut(function(){$(this).remove()}));
  });
}

function resetOptions() {
  for(var key in DEFAULT_OPTIONS)
    $('#' + key).val(DEFAULT_OPTIONS[key]);
}

chrome.storage.sync.get("options", function(data){
  for(var key in data.options)
    $('#' + key).val(data.options[key]);
});

$('#save-btn').click(saveOptions);
$('#reset-btn').click(resetOptions);