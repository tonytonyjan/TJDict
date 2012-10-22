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
      $('[name=\''+key+'\']').val(defaultOptions[key]);
  });
  $('[name^=dict_enable]').prop("checked", false);
}

// 顯示字典設定清單
var optDictList = "";
for(var i in TJDict.engines){
  optDictList += '<li><input type="checkbox" name="dict_enable[' + i + ']" value="true">' + TJDict.engines[i].title + '</li>';
}
$('#opt-enable-dicts-fields').append(optDictList);

// 初始化表單
$(function(){
  chrome.storage.sync.get("options", function(data){
    for(var key in data.options)
      $('[name=\''+key+'\']').val(data.options[key]).prop("checked", true);
    //如果全部是空的，則全選
    if($('[name^=dict_enable]:checked').length == 0){
      $('[name^=dict_enable]').prop("checked", true);
      saveOptions();
    }
  });

  $('#save-btn').click(saveOptions);
  $('#reset-btn').click(resetOptions);
});