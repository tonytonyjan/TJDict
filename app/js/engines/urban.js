TJDict.engines.push({
  title: 'Urban Dictionary',
  url: function(q){return 'http://www.urbandictionary.com/define.php?term=' + q},
  resault: function(data){
    var body = $(TJDict.grepBody(data));
    
    var table = body.find('#entries');
	var defs = table.find('.text .definition');
	var exs = table.find('.text .example');
    var result = '';
	for(var i=0; i<defs.length; ++i){
	  result += '<p>';
	  result += '<h3>'+ (i+1) + '. </h3>';
	  result += '<div style="margin-left:5px">'+defs.eq(i).text().replace(/\n+/g, '<br />')  +'</div>';
	  result += '<h4>例</h4>';
	  result += '<div style="font-style:italic; margin-left:5px">'+exs.eq(i).text().replace(/\n+/g, '<br />')+'</div>';
	  result += '</p>';
    };
    return result;
  }
});