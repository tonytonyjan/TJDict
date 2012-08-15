params_cache = {};
function params(name) {
    if(params_cache[name])
      return params_cache[name]
    else if(match = RegExp(name + '=' + '(.+?)(&|$)').exec(location.search))
      return (params_cache[name] = match[1])
    else
      return null
}