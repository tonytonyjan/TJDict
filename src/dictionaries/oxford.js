const oxford = (query) =>
  fetch(`https://www.lexico.com/en/definition/${encodeURIComponent(query)}`)
    .then((response) => {
      if (!response.ok) throw new Error("not ok");
      return response.text();
    })
    .then((body) => {
      const dom = new DOMParser().parseFromString(body, "text/html");
      const result = document.createDocumentFragment();
      const sections = dom.querySelectorAll("section.gramb");
      if (sections.length === 0) return null;

      sections.forEach((node) => result.appendChild(node));
      result
        .querySelectorAll(".examples,.synonyms")
        .forEach((node) => node.parentNode.removeChild(node));
      result
        .querySelectorAll("[class]")
        .forEach((node) => node.removeAttribute("class"));
      return result;
    })
    .catch(() => null);
export default oxford;
