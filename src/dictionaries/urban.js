import React from "react";

const urban = async (query) => {
  const response = await fetch(
    `https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
      query
    )}`
  );
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  const panels = Array.from(dom.querySelectorAll(".def-panel[data-defid]"))
    .filter(
      (i) =>
        !i.querySelector(".ribbon")?.textContent?.includes("Word of the Day")
    )
    .map((i) => ({
      title: i.querySelector(".def-header")?.textContent,
      meanings: Array.from(i.querySelector(".meaning")?.childNodes || [])
        .reduce((accumulator, current) => {
          accumulator.push(
            current instanceof HTMLBRElement ? "\n" : current.textContent
          );
          return accumulator;
        }, [])
        .join("")
        .split(/\n+/),
      examples: Array.from(i.querySelector(".example")?.childNodes || [])
        .reduce((accumulator, current) => {
          accumulator.push(
            current instanceof HTMLBRElement ? "\n" : current.textContent
          );
          return accumulator;
        }, [])
        .join("")
        .split(/\n+/),
    }));
  return (
    <div>
      {panels.map(({ title, meanings, examples }, index) => (
        <div key={index}>
          <div className="lead">{title}</div>
          <ul>
            {meanings.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ul>
          <ul className="text-secondary">
            {examples.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

urban.displayName = "Urban 英英 俚語";

export default urban;
