var params_cache = {};
function params(name) {
  if(params_cache[name])
    return params_cache[name];
  else if(match = RegExp(name + '=' + '(.+?)(&|$)').exec(location.search))
    return (params_cache[name] = match[1]);
  else
    return null;
}

function getSelectionCoords() {
  var sel = document.selection, range;
  var x = 0, y = 0;
  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
          range.collapse(true);
          var rect = range.getClientRects()[0];
          x = rect.left;
          y = rect.top;
      }
    }
  }
  return { x: x, y: y };
}

if(typeof jQuery != "undefined"){
  $.fn.serializeObject = function()
  {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };
}