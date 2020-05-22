const regex = /weblio\.jp\/content\/([^/]+)/;

const weblio = (query) =>
  fetch(`https://www.weblio.jp/content/${query}`)
    .then((response) => {
      if (!response.ok) throw new Error("not ok");
      return response.text();
    })
    .then((body) => {
      const dom = new DOMParser().parseFromString(body, "text/html");
      const titles = dom.querySelectorAll(".pbarTL");
      if (titles.length === 0) return null;
      const contents = dom.querySelectorAll(".kiji");
      dom
        .querySelectorAll('[href*="weblio.jp/content/"]')
        .forEach((a) => (a.href = `/index.html#/q/${a.href.match(regex)[1]}`));
      const minSize =
        titles.length < contents.length ? titles.length : contents.length;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < minSize; i++) {
        const h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(titles[i].textContent));
        fragment.appendChild(h3);
        fragment.appendChild(contents[i]);
      }
      fragment
        .querySelectorAll("[class]")
        .forEach((node) => node.removeAttribute("class"));
      return fragment;
    })
    .catch(() => null);
export default weblio;
