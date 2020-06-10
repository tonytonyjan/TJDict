import React from "react";

const Help = () => (
  <div className="container py-3">
    <article>
      <h1 className="pb-2 mb-2 border-bottom">常見問題</h1>
      <h2 className="h4">滑鼠雙擊沒有效果怎麼辦？</h2>
      <p>
        TJDict
        在安裝或更新後，只有對於新載入的頁面才會生效，重新整理網頁即可排除問題。
      </p>
      <h2 className="h4">找不到你要的資訊？</h2>
      <a
        href="https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp/support"
        target="_blank"
        rel="noreferrer noopener"
      >
        回報問題
      </a>
    </article>
  </div>
);
export default Help;
