DICTIONARIES.oxford = {
  title: '牛津字典',
  desc: '英英',
  langs: ['en'],
  query: function(q, response){
    var self = this;
    var result = '';
    q = q.replace(/ /g, '-');
    $.get('http://www.oxforddictionaries.com/definition/english/' + q).done(function(data){
      $(data).find('.se1.senseGroup').each(function(i, group){
        console.log(group)
        var accordion_id = 'oxford_accordion_' + i;
        var panelGroup = $('<div class="panel-group" id="' + accordion_id + '"></div>');
        var title = $(group).find('.partOfSpeech').text().trim(); // ex. none, verb, etc
        result += '<h2>' + title + '</h2>'
        var se2s = $(group).find('.se2');
        if(se2s.length == 0) se2s = $([group]);
        se2s.each(function(j, section){
          $(section).find('.senseInnerWrapper').each(function(k, sense){
            var id = 'oxford_panel_' + i + '_' + j + '_' + k;
            var definition = $(sense).find('.definition').text().trim();
            var iteration = $(sense).find('.iteration').text().trim();
            var is_in = (j == 0 && k == 0) ? ' in' : ''
            var panel = $('<div class="panel panel-info"><div class="panel-heading">\
            <h4 class="panel-title"><a data-toggle="collapse" data-parent="#' + accordion_id + '" href="#' + id + '">' + iteration + ' - ' + definition +
            '</a></h4></div><div id="' + id +
            '" class="panel-collapse collapse' + is_in + '">\
            <div class="panel-body"><ul></ul></div></div></div>');
            var example_list = $(sense).find('.sentence_dictionary .sentence');
            panel.find('ul').append(example_list);
            panelGroup.append(panel);
          });
        });
        result += panelGroup[0].outerHTML;
      });
      response(self, result);
    });
  }
};