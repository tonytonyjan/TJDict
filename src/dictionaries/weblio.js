import React from "react";

const regex = /weblio\.jp\/content\/([^/]+)/;

const weblio = async (query) => {
  const response = await fetch(
    `https://www.weblio.jp/content/${encodeURIComponent(query)}%20%20`
  );
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  const sections = Array.from(
    dom.getElementById("cont")?.querySelectorAll(".pbarT,.kijiWrp>.kiji") || []
  ).reduce(
    (acc, i) => {
      if (i.classList.contains("pbarT")) {
        acc.tmp.title = i.querySelector(".pbarTL")?.textContent;
        return acc;
      } else if (i.classList.contains("kiji")) {
        i.querySelectorAll("[class],[style]").forEach((node) => {
          node.removeAttribute("class");
          node.removeAttribute("style");
        });
        i.querySelectorAll("h2").forEach((node) => {
          const h4 = document.createElement("h4");
          h4.append(...node.childNodes);
          node.replaceWith(h4);
        });
        i.querySelectorAll("h3").forEach((node) => {
          const h5 = document.createElement("h5");
          h5.append(...node.childNodes);
          node.replaceWith(h5);
        });
        i.querySelectorAll('[href*="weblio.jp/content/"]').forEach(
          (a) => (a.href = `/index.html#/q/${a.href.match(regex)[1]}`)
        );
        acc.tmp.html = i.innerHTML;
        acc.list.push(acc.tmp);
        acc.tmp = {};
        return acc;
      }
    },
    { list: [], tmp: {} }
  ).list;
  if (sections.length === 0) return null;
  return (
    <div>
      {sections.map(({ title, html }, index) => (
        <div key={index}>
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ))}
    </div>
  );
};

weblio.displayName = "Weblio 日日";

export default weblio;
