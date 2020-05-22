const yahoo = (query) =>
  fetch(`https://tw.dictionary.search.yahoo.com/search?p=${query}`)
    .then((response) => {
      if (!response.ok) throw new Error("not ok");
      return response.text();
    })
    .then((body) => {
      const dom = new DOMParser().parseFromString(body, "text/html");
      const result = dom.querySelector(
        ".tab-control-item[data-name=explanation]"
      )
        ? dom.querySelector(".tabsContent-s")
        : dom.querySelector(".grp.grp-main");
      dom
        .querySelectorAll("[class]")
        .forEach((node) => node.removeAttribute("class"));
      return result;
    })
    .catch(() => null);
export default yahoo;
