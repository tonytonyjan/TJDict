var params_cache = {};
function params(name) {
  if(params_cache[name])
    return params_cache[name];
  else if(match = RegExp(name + '=' + '(.+?)(&|$)').exec(location.search))
    return (params_cache[name] = match[1]);
  else
    return null;
}

function displayResault(q){
  chrome.storage.sync.get("options", function(data){
    for(var i in TJDict.engines){
      if(data.options["dict_enable[" + i +"]"] == "true")
        $.ajax({
          url: TJDict.engines[i].url(q),
          ajaxI: i
        }).done(function(data){
          var title = "<div class='page-header'><h2>" + 
                    TJDict.engines[this.ajaxI].title +
                    "</h2></div>";
          var resault = TJDict.engines[this.ajaxI].resault(data);
          $('#tab-index').append(title + resault);
        });
    }
  });
}

function init(callback){
  chrome.storage.sync.get("options", function(data){
    //如果全部是空的，則全選
    if($('[name^=dict_enable]:checked').length == 0){
      $('[name^=dict_enable]').prop("checked", true);
      saveOptions(callback);
    }else{
      if(typeof callback == "function") callback();
    }
  });
}

function main(){
  $('.tooltip-bottom').tooltip({
    placement: "bottom"
  });
  $('#search-field').focus();
  // 搜尋
  if(params('q')){
    displayResault(params('q'));
    $('#search-field').val(decodeURIComponent(params('q')));
  }else{
    $('#tab-index').html('<p>請輸入關鍵字 :)</p>');
  }

  if(location.hash == "#options")
    $('#options-link').tab('show');

  // 避免 Enter 送出表單
  $('#options-form').keypress(function(e) {
    if(e.which == 13) return false;
  });

  // 顯示字典清單
  var dictList = "";
  for(var i in TJDict.engines)
    dictList += "<li>" + TJDict.engines[i].title + "</li>";
  $('#dict-list').append(dictList);
}

$(function(){
  init(main);
});