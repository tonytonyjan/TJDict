function save_options() {
  options = {};
  for(var i in DICTIONARIES) options[i] = document.getElementById(i).checked;
  chrome.storage.sync.set(options, function() {
    $('#modal_setting').modal('hide');
  });
}

function restore_options() {
  var default_options = {};
  for(var i in DICTIONARIES) default_options[i] = true;
  chrome.storage.sync.get(default_options, function(items) {
    for(var i in items) document.getElementById(i).checked = items[i];
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);