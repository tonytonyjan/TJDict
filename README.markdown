每一個字典都放在 `app/js/engines` 裡面，要投稿字典請到這裡新增檔案，範例如下：

  TJDict.engines.push(object);

## Options

<dl>
  <dt>title: string</dt>
  <dd>字典的標題</dd>
  <dd>範例：<code>title: "句酷雙語例句"</code></dd>
  
  <dt>url: function(query)</dt>
  <dd>必須回傳網頁的查詢網址字串</dd>
  <dd>範例：<code>url: function(q){return "http://www.jukuu.com/search.php?q=" + q}</code></dd>

  <dt>resault: function(data)</dt>
  <dd>必須回傳整理過的 HTML 字串</dd>
  <dd>參數 <code>data</code> 是透過 url 回傳的內文的 body 字串</dd>
</dl>