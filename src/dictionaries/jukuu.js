import React from "react";

const jukuu = (query) =>
  fetch(`http://www.jukuu.com/search.php?q=${encodeURIComponent(query)}`, {
    referrerPolicy: "no-referrer",
  })
    .then((response) => {
      if (!response.ok) throw new Error("not ok");
      return response.text();
    })
    .then((body) => {
      const dom = new DOMParser().parseFromString(body, "text/html");
      var trs1 = dom.querySelectorAll("tr.e > td:nth-child(2)");
      var trs2 = dom.querySelectorAll("tr.c > td:nth-child(2)");
      if (trs1.length === 0) return null;
      return (
        <ul>
          {Array.from(trs1).map((i, index) => (
            <li key={index}>
              <p dangerouslySetInnerHTML={{ __html: i.innerHTML }}></p>
              <p
                style={{ color: "blue" }}
                dangerouslySetInnerHTML={{ __html: trs2[index].innerHTML }}
              />
            </li>
          ))}
        </ul>
      );
    })
    .catch(() => null);

jukuu.displayName = "句酷";

export default jukuu;
