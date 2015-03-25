var Typeahead = {
  init: function(){
    var words = new Bloodhound({
      datumTokenizer: function(d){ return Bloodhound.tokenizers.whitespace(d.key); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 8,
      remote: {
        url: 'https://tw.search.yahoo.com/sugg/gossip/gossip-tw-vertical_ss/?output=json&pubid=1306&command=%QUERY',
        filter: function(parsedResponse){ return parsedResponse.gossip.results; }
      }
    });
    words.initialize();
    $('#q').typeahead({
      displayText: function(item){ return item.key; },
      source: words.ttAdapter()
    });
  }
}