var DEFAULT_OPTIONS = {};
DEFAULT_OPTIONS.order = [];
for(var i in DICTIONARIES){
  DEFAULT_OPTIONS[i] = true;
  DEFAULT_OPTIONS.order.push(i);
}

// 顯示字典 BEGIN
for(var i in DICTIONARIES){
  // 關於
  $('#dict_list').append('<li>' + DICTIONARIES[i].title + '</li>');
  // 設定
  $('#dict_checkboxes').append('<div data-id="' + i + '" class="checkbox"><span class="glyphicon glyphicon-resize-vertical"></span><label><input id="' + i + '" name="' + i + '" type="checkbox"> ' + DICTIONARIES[i].title + '</label></div>');
}
// 顯示字典 END

// Storage BEGIN
function save_options() {
  options = {};
  for(var i in DICTIONARIES) options[i] = document.getElementById(i).checked;
  options.order = sortableDict.toArray();
  chrome.storage.sync.set(options, function() {
    $('#modal_setting').modal('hide');
  });
}

function restore_options() {
  chrome.storage.sync.get(DEFAULT_OPTIONS, function(items){
    for(var i in DICTIONARIES) document.getElementById(i).checked = items[i];
  });
}

restore_options();
$('#save').click(save_options);
// Storage END

// 排序 BEGIN
var dictList = document.getElementById('dict_checkboxes');
var sortableDict = new Sortable(dictList, {
  handle: '.glyphicon-resize-vertical'
});
chrome.storage.sync.get(DEFAULT_OPTIONS, function(data){
  sortableDict.sort(data.order);
});
// 排序 END