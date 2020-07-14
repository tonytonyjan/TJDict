import React from "react";

export default async (fetchPromise) => {
  const response = await fetchPromise;
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
      groupsEn: Array.from(i.querySelectorAll(".enen-groups > dl")).map(
        (i) => ({
          partOfSpeech: i.querySelector("dt").textContent.trim(),
          definitions: Array.from(i.querySelectorAll("dd")).map((i) => ({
            summary: i.textContent?.trim(),
          })),
        })
      ),
      analytics: Array.from(
        i.querySelectorAll(
          ".word-details-item.analyzes > .word-details-item-content > *"
        )
      ).reduce(
        ({ result, title }, current) => {
          if (current.classList.contains("analyzes-title"))
            return { result, title: current.textContent };
          if (current.classList.contains("analyzes-items")) {
            const items = Array.from(current.querySelectorAll("li")).map(
              (i) => ({
                primary: i.querySelector("a")?.textContent,
                secondary: i.querySelector("p")?.textContent,
              })
            );
            result.push({ title, items });
            return { result, title: "" };
          }
        },
        { result: [] }
      ).result,
      phrases: Array.from(i.querySelectorAll(".phrase-items > li")).map(
        (i) => ({
          from: i.querySelector("*:first-child")?.textContent?.trim(),
          to: i.querySelector(".phrase-def")?.textContent?.trim(),
        })
      ),
      inflections: Array.from(
        i.querySelectorAll(".inflections-items > li")
      ).map((i) => ({
        name: i.querySelector("span:first-child")?.textContent?.trim(),
        value: i.querySelector("a:last-child")?.textContent?.trim(),
      })),
    })
  );
  if (panes.length === 0) return null;
  return (
    <div>
      {panes.map((i, index) => (
        <div key={index}>
          <div>
            <div className="lead">
              {i.word} <span className="text-secondary">{i.pronunciation}</span>
            </div>
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
            {i.phrases.length > 0 && (
              <div>
                <div className="lead">片語</div>
                <ol>
                  {i.phrases.map((i, index) => (
                    <li key={index}>
                      {i.from}
                      <br />
                      <span className="text-secondary">{i.to}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {i.groupsEn.length > 0 && (
              <div>
                <div className="lead">英英釋義</div>
                {i.groupsEn.map((i, index) => (
                  <div key={index}>
                    <div className="lead">{i.partOfSpeech}</div>
                    <ol>
                      {i.definitions.map((i, index) => (
                        <li key={index}>{i.summary} </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
            {i.analytics.length > 0 && (
              <div>
                <div className="lead">詞意分析</div>
                <ul className="list-unstyled">
                  {i.analytics.map((i, index) => (
                    <li key={index}>
                      {i.title}
                      <ol>
                        {i.items.map((i, index) => (
                          <li key={index}>
                            {i.primary}
                            <br />
                            <span className="text-secondary">
                              {i.secondary}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {i.inflections.length > 0 && (
              <div>
                <div className="lead">詞性變化</div>
                <table className="table" style={{ maxWidth: 300 }}>
                  <tbody>
                    {i.inflections.map((i, index) => (
                      <tr key={index}>
                        <td>{i.name}</td>
                        <td className="text-secondary">{i.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
