import React from "react";

const hjenglish = async (query) => {
  const response = await fetch(
    `https://dict.hjenglish.com/jp/jc/${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  const panes = Array.from(dom.querySelectorAll(".word-details-pane")).map(
    (i) => ({
      word: i.querySelector(".word-text")?.textContent.trim(),
      pronunciation: i
        .querySelector(".pronounces")
        .textContent.trim()
        .split(/\s+/g)
        .slice(0, 2)
        .join(" "),
      simpleHtml: (() => {
        const result = i.querySelector(".simple");
        result.querySelectorAll("h2").forEach((node) => {
          const div = document.createElement("div");
          div.classList.add("lead");
          div.append(...node.childNodes);
          node.replaceWith(div);
        });
        result.querySelectorAll("ul").forEach((node) => {
          const ol = document.createElement("ol");
          node
            .querySelectorAll("li > span")
            .forEach((node) => node.parentNode.removeChild(node));
          ol.append(...node.childNodes);
          node.replaceWith(ol);
        });
        return result.innerHTML;
      })(),
      groups: Array.from(i.querySelectorAll(".detail-groups > dl")).map(
        (i) => ({
          partOfSpeech: i.querySelector("dt").textContent.trim(),
          definitions: Array.from(i.querySelectorAll("dd")).map((i) => ({
            summary: i.querySelector("h3")?.textContent?.trim(),
            examples: Array.from(i.querySelectorAll("ul > li")).map((i) => ({
              from: i.querySelector(".def-sentence-from")?.textContent?.trim(),
              to: i.querySelector(".def-sentence-to")?.textContent?.trim(),
            })),
          })),
        })
      ),
    })
  );
  if (panes.length === 0) return null;
  return (
    <div>
      {panes.map((i, index) => (
        <div key={index}>
          <div className="lead">
            {i.word} <span className="text-secondary">{i.pronunciation}</span>
            {/* <div dangerouslySetInnerHTML={{ __html: i.simpleHtml }} /> */}
            {i.groups.map((i, index) => (
              <div key={index}>
                <div className="lead">{i.partOfSpeech}</div>
                <ol>
                  {i.definitions.map((i, index) => (
                    <li key={index}>
                      {i.summary}{" "}
                      <ul>
                        {i.examples.map((i, index) => (
                          <li key={index}>
                            {i.from}
                            <br />
                            <span className="text-secondary">{i.to}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

hjenglish.displayName = "滬江小D";
hjenglish.fullName = "滬江小D 日中字典";

export default hjenglish;
