TJDict = {
  engines: [],
  grepBody: function(string) {
    var regex = /<body[^>]*>([\S\s]*)<[^<]*body>/;
    var matches = regex.exec(string);
    matches[1] = matches[1].replace(/(<\s*img+)(\s*[^>]*\s*)(>)/ig, "$1$3");
    return matches[1];
  }
}