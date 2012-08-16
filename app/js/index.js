function displayResault(q){
  for(var i in TJDict.engines){
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
}

$('.tooltip-bottom').tooltip({
  placement: "bottom"
});

if(params('q')){
  displayResault(params('q'));
  $('#search-field').val(decodeURIComponent(params('q')));
}else{
  $('#tab-index').html('<p>請輸入關鍵字 :)</p>');
}

// 避免 Enter 送出表單
$('#options-form').keypress(function(e) {
  if(e.which == 13) return false;
});

/*$('#close-link').click(function(){
  if(top == self){
    window.open('', '_self', '');
    window.close();
  }else
    chrome.extension.sendMessage({op: "close"});
});*/