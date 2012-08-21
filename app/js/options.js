if(typeof jQuery != "undefined"){
  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
}

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
  chrome.extension.sendMessage({op: "getDefaultOptions"}, function(defaultOptions){
    for(var key in defaultOptions)
      $('#' + key).val(defaultOptions[key]);
  });
}

chrome.storage.sync.get("options", function(data){
  for(var key in data.options)
    $('#' + key).val(data.options[key]);
});

$('#save-btn').click(saveOptions);
$('#reset-btn').click(resetOptions);