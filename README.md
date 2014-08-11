# TJDict
英漢、漢英網路查詢字典的 Chrome 擴充功能

## 安裝

[Chrome 線上應用程式商店](https://chrome.google.com/webstore/detail/tjdict/caafmojgjlbflohillejdmnghkpcjjpp)

## 開發

1. 在 `js/dictionaries/` 新增字典檔，例如 `my_dict.js`
2. 在 `index.html` 中載入，例如

    <!-- dictionaries -->
    <script src="/js/dictionaries/yahoo.js"></script>
    <script src="/js/dictionaries/nciku.js"></script>
    <script src="/js/dictionaries/jukuu.js"></script>
    <script src="/js/dictionaries/my_dict.js"></script>

### 字典檔

字典檔是全區域變數 `DICTIONARIES` 底下的一個 js 物件，字典名稱請與檔名保持一致，例如 `yahoo.js` 內，要將字典物件定義在 `DICTIONARIES.yahoo` 裡。

字典物件：

<table>
  <thead><tr><th>資料形態</th><th>屬性</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td>string</td><td>title</td><td>顯示的字典名稱</td></tr>
    <tr>
      <td>function</td>
      <td>query</td>
      <td>
        <p>字典的主要實作，函式格式：</p>
        <p><code>function(queryString, response){...};</code></p>
        <table>
          <thead><tr><th>資料形態</th><th>屬性</th><th>說明</th></tr></thead>
          <tbody>
            <tr><td>string</td><td>queryString</td><td>查詢的字</td></tr>
            <tr>
              <td>function</td>
              <td>response</td>
              <td>
                <p>需要在最後尾呼叫此函式，呼叫方式：</p> 
                <p><code>response(self, result);</code></p>
                <table>
                  <thead><tr><th>資料形態</th><th>屬性</th><th>說明</th></tr></thead>
                  <tbody>
                    <tr><td>object</td><td>self</td><td>回傳字典物件，使用方式請參考範例</td></tr>
                    <tr><td>string</td><td>result</td><td>查詢的結果，可以是 HTML</td></tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

### 範例

```js
// js/dictionaries/yahoo.js
DICTIONARIES.yahoo = {
  title: 'Yahoo 字典',
  query: function(q, response){
    var self = this;
    $.get('http://tw.dictionary.search.yahoo.com/search?p=' + q).done(function(data){
      response(self, $(data).find('.explanation_wrapper')[0]);
    });
  }
};
```