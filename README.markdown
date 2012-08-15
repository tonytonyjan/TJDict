每一個字典兜放在 `app/js/engines` 裡面，要投稿字典請到這裡新增檔案，範例如下：

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

## 範例

    TJDict.engines.push({
      title: "句酷雙語例句",
      url: function(q){return "http://www.jukuu.com/search.php?q=" + q},
      resault: function(data){
        var regex = /<body[^>]*>([\S\s]*)<[^<]*body>/;
        var matches = regex.exec(data);
        matches[1] = matches[1].replace(/(<\s*img+)(\s*[^>]*\s*)(>)/ig, "$1$3");
        var body = $(matches[1]);
        var trs1 = body.find('tr.e td:nth-child(2)');
        var trs2 = body.find('tr.c td:nth-child(2)');
        var resault = "<ul>";
        for(var i = 0; i < 10; i++){
          resault += "<li>" +
          "<p>" + trs1[i].innerHTML + "</p>" +
          "<p style='color:blue'>" + trs2[i].innerHTML + "</p>" +
          "</li>";
        }
        resault += "</ul>";
        return resault;
      }
    });