import React from "react";

const oxford = async (query) => {
  const response = await fetch(
    `https://www.lexico.com/en/definition/${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  const items = Array.from(
    dom.querySelectorAll(
      ".entryWrapper>.entryHead,.entryWrapper>.gramb,.entryWrapper>.etymology"
    )
  );
  if (items.length === 0) return null;
  return items.map((node, i) => {
    if (node.classList.contains("entryHead")) {
      const title = node.querySelector(".hw")?.childNodes?.[0]?.nodeValue;
      const sup = node.querySelector(".hw sup")?.textContent;
      const pronunciations = Array.from(
        node.querySelectorAll(".phoneticspelling")
      ).map((i) => i.textContent);
      return (
        <div key={i}>
          {title && (
            <div className="lead">
              {title}
              {sup && <sup>{node.querySelector(".hw sup").textContent}</sup>}
            </div>
          )}
          {pronunciations.length > 0 && (
            <ul className="list-inline m-0">
              {pronunciations.map((i, index) => (
                <li key={index} className="list-inline-item text-secondary">
                  {i}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    } else if (node.classList.contains("gramb")) {
      const partOfSpeech = node.querySelector(".pos")?.textContent;
      const definitions = Array.from(node.querySelectorAll("ul.semb>li")).map(
        (i) => ({
          summary: i.querySelector(".ind")?.textContent,
          crossReference: i.querySelector(".crossReference")?.textContent,
          examples: [
            i.querySelector(".exg")?.textContent,
            ...Array.from(i.querySelectorAll(".examples li.ex")).map(
              (i) => i.textContent
            ),
          ].filter((i) => i),
          subSenses: Array.from(
            i.querySelectorAll(".subSenses>li.subSense")
          ).map((i) => ({
            summary: i.querySelector(".ind")?.textContent,
            crossReference: i.querySelector(".crossReference")?.textContent,
            examples: [
              i.querySelector(".exg")?.textContent,
              ...Array.from(i.querySelectorAll(".examples li.ex")).map(
                (i) => i.textContent
              ),
            ].filter((i) => i),
          })),
        })
      );
      return (
        <div key={i}>
          <div className="lead">{partOfSpeech}</div>
          <ol>
            {definitions.map(
              ({ summary, crossReference, examples, subSenses }, index) => (
                <li key={index}>
                  <div>{summary}</div>
                  <div>{crossReference}</div>
                  <ul>
                    {examples.slice(0, 2).map((example, index) => (
                      <li key={index} className="text-secondary">
                        {example}
                      </li>
                    ))}
                  </ul>
                  <ol>
                    {subSenses.map(({ summary, examples }, index) => (
                      <li key={index}>
                        <div>{summary}</div>
                        <div>{crossReference}</div>
                        <ul>
                          {examples.slice(0, 2).map((example, index) => (
                            <li key={index} className="text-secondary">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </li>
              )
            )}
          </ol>
        </div>
      );
    } else if (node.classList.contains("etymology")) {
      const title = node.querySelector("h3>strong")?.textContent;
      const origin = node.querySelector(".senseInnerWrapper>p")?.textContent;
      const phrases = Array.from(
        node.querySelectorAll(".senseInnerWrapper .phrase")
      ).map((i) => {
        let semp = i;
        while (!semp.classList.contains("semb")) semp = semp.nextElementSibling;
        return {
          phrase: i.textContent,
          summary: semp.querySelector(".ind")?.textContent,
          examples: [
            semp.querySelector(".exg")?.textContent,
            ...Array.from(semp.querySelectorAll(".examples li.ex")).map(
              (i) => i.textContent
            ),
          ].filter((i) => i),
        };
      });
      return (
        <div key={i}>
          <div className="lead">{title}</div>
          {origin && <p>{origin}</p>}
          {phrases.length > 0 && (
            <ul>
              {phrases.map(({ phrase, summary, examples }, index) => (
                <li key={index}>
                  <div className="lead">{phrase}</div>
                  <div>{summary}</div>
                  <ul>
                    {examples.slice(0, 2).map((example, index) => (
                      <li key={index} className="text-secondary">
                        {example}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    } else {
      return <div key={i}></div>;
    }
  });
};

oxford.displayName = "Oxford";
oxford.fullName = "Oxford 牛津英英詞典";

export default oxford;
