$('.tooltip-bottom').tooltip({
  placement: "bottom"
});

if(params('q')){
  TJDict.query(params('q'));
  $('#search-field').val(decodeURIComponent(params('q')));
}else{
  $('#container').html('<p>請輸入關鍵字 :)</p>');
}