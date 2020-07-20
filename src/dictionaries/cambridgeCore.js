import React from "react";

export default async (fetchPromise) => {
  const response = await fetchPromise;
  if (!response.ok) throw new Error("not ok");

  const body = await response.text();
  const entries = parse(body);
  if (!entries) return null;
  return entries.map((i, index) => (
    <div key={index}>
      <div>
        {i.title} <small className="text-secondary">{i.partOfSpeech}</small>
      </div>
      <div className="text-secondary">
        {i.pronunciations
          .filter((i) => i.value)
          .map((i) => `${i.region} ${i.value}`)
          .join(" ")}
      </div>
      <div>
        {i.senses.map((i, index) => (
          <div key={index}>
            <div>{i.title}</div>
            <div>
              {i.blocks.map((i, index) => (
                <div key={index}>
                  <div>
                    <span className="badge badge-secondary">{i.label}</span>{" "}
                    <span className="text-secondary">{i.gram}</span>{" "}
                    <span className="text-secondary">
                      {i.pronunciations
                        .filter((i) => i.value)
                        .map((i) => `${i.region} ${i.value}`)
                        .join(" ")}
                    </span>{" "}
                    <span>{i.inflections.join(" | ")}</span>
                  </div>
                  <div>{i.definition}</div>
                  <div>{i.translation}</div>
                  <ul>
                    {i.examples.map(({ from, to }, index) => (
                      <li key={index}>
                        {from}
                        {to && <div className="text-secondary">{to}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
};

export const parse = (html) => {
  const dom = new DOMParser().parseFromString(html, "text/html");
  const entries = Array.from(dom.querySelectorAll(".entry-body__el")).map(
    (i) => ({
      title: i.querySelector(".hw.dhw")?.textContent,
      partOfSpeech: i.querySelector(".posgram")?.textContent,
      pronunciations: Array.from(
        i.querySelectorAll(".pos-header .dpron-i")
      ).map((i) => ({
        region: i.querySelector(".region")?.textContent,
        value: i.querySelector(".pron.dpron")?.textContent,
      })),
      senses: Array.from(i.querySelectorAll(".pr.dsense")).map((i) => ({
        title: i
          .querySelector(".dsense_h")
          ?.textContent?.trim()
          ?.replace(/\s+/g, " "),
        blocks: Array.from(i.querySelectorAll(".def-block")).map((i) => ({
          label: i.querySelector(".epp-xref")?.textContent,
          gram: i.querySelector(".gram")?.textContent,
          pronunciations: Array.from(i.querySelectorAll(".dpron-i")).map(
            (i) => ({
              region: i.querySelector(".region")?.textContent,
              value: i.querySelector(".pron.dpron")?.textContent,
            })
          ),
          inflections: Array.from(i.querySelectorAll(".inf.dinf")).map(
            (i) => i.textContent
          ),
          definition: i.querySelector(".def")?.textContent,
          translation: i.querySelector(".trans")?.textContent,
          examples: Array.from(i.querySelectorAll(".examp")).map((i) => ({
            from: i.querySelector(".eg")?.textContent,
            to: i.querySelector(".trans")?.textContent,
          })),
        })),
      })),
    })
  );
  return entries.length > 0 ? entries : null;
};
