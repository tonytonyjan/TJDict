var Options = {
  init: function(){
    Options.setDefaultOptions();
    Options.showDict();
    Options.restoreOptions();
    $('#save').click(Options.save_options);
  },

  setDefaultOptions: function() {
    DEFAULT_OPTIONS = {
      order: [],
      open_method: 'popup',
      close_method: 'auto',
      hold_feature: false,
      han_default_tts: 'ja',
      auto_tts: true,
      show_donate: true
    }
    for(var i in DICTIONARIES){
      DEFAULT_OPTIONS[i] = true;
      DEFAULT_OPTIONS.order.push(i);
      DICTIONARIES[i].id = i; // for reflection
    }
  },

  showDict: function(){
    for(var i in DICTIONARIES)
      $('#dict_checkboxes').append('<div data-id="' + i + '" class="checkbox"><span class="glyphicon glyphicon-resize-vertical"></span><label><input id="' + i + '" name="' + i + '" type="checkbox"> ' + DICTIONARIES[i].title + '（' + DICTIONARIES[i].desc + '）</label></div>');
    Options.sortable_dict = new Sortable(document.getElementById('dict_checkboxes'));
  },

  save_options: function() {
    options = {};
    for(var i in DICTIONARIES) options[i] = document.getElementById(i).checked;
    options.order = Options.sortable_dict.toArray();
    options.open_method = $('input[name=open_method]:checked').val();
    options.close_method = $('input[name=close_method]:checked').val();
    options.hold_feature = $('input[name=hold_feature]').prop('checked');
    options.show_donate = $('input[name=show_donate]').prop('checked');
    options.han_default_tts = $('input[name=han_default_tts]:checked').val();
    options.auto_tts = $('input[name=auto_tts]').prop('checked');
    chrome.storage.sync.set(options, function() {
      $('#modal_setting').modal('hide');
    });
  },

  restoreOptions: function() {
    chrome.storage.sync.get(DEFAULT_OPTIONS, function(items){
      $('input[name=open_method][value="' + items.open_method +'"]').prop('checked', true);
      $('input[name=close_method][value="' + items.close_method +'"]').prop('checked', true);
      $('input[name=hold_feature]').prop('checked', items.hold_feature);
      $('input[name=show_donate]').prop('checked', items.show_donate);
      $('input[name=han_default_tts][value="' + items.han_default_tts +'"]').prop('checked', true);
      $('input[name=auto_tts]').prop('checked', items.auto_tts);
      for(var i in DICTIONARIES) document.getElementById(i).checked = items[i];
      Options.sortable_dict.sort(items.order);
    });
  }
};