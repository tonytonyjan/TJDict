var DICTIONARIES = {};

var DEFAULT_OPTIONS = {};

var LANG_MATCHER = {
  ja: /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/,
  en: /^\w+/,
  zh: /^[\u4E00-\u9FFF]+$/
};

var TRANSLATION = {
  ja: '日', en: '英', zh: '中'
}

var urlParams;
(window.onpopstate = function(){
  var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);

  urlParams = {};
  while(match = search.exec(query)) urlParams[decode(match[1])] = decode(match[2]);
})();

function isProduction(){
  return !!chrome.runtime.getManifest().update_url;
}