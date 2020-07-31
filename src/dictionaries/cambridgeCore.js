import React from "react";
import DTypography from "components/DictionaryTypography";

export default async (fetchPromise) => {
  const response = await fetchPromise;
  if (!response.ok) throw new Error("not ok");

  const body = await response.text();
  const entries = parse(body);
  if (!entries) return null;
  return entries.slice(0, 1).map((i, index) => (
    <div key={index}>
      <DTypography variant="h1">{i.title}</DTypography>
      <div style={{ height: 4 }} />
      <DTypography variant="h2">{i.partOfSpeech}</DTypography>
      <div style={{ height: 4 }} />
      <ul className="list-inline mb-0">
        {i.pronunciations.map((i, index) => (
          <li key={index} className="list-inline-item">
            <DTypography component="span" variant="h3">
              {i.region}
            </DTypography>{" "}
            <DTypography component="span" variant="h4">
              {i.value}
            </DTypography>
          </li>
        ))}
      </ul>
      <div style={{ height: 8 }} />
      <div>
        {i.senses.map((i, index) => (
          <div key={index}>
            <DTypography variant="h2">{i.title}</DTypography>
            <div>
              {i.blocks.map((i, index) => (
                <div key={index}>
                  <div>
                    {i.label && (
                      <DTypography component="span" variant="h5">
                        {i.label}
                      </DTypography>
                    )}{" "}
                    <DTypography component="span" variant="h2">
                      {i.gram}
                    </DTypography>
                    <div style={{ height: 2 }} />
                    <ul className="list-inline mb-0">
                      {i.pronunciations.map((i, index) => (
                        <li key={index} className="list-inline-item">
                          <DTypography component="span" variant="h3">
                            {i.region}
                          </DTypography>{" "}
                          <DTypography component="span" variant="h4">
                            {i.value}
                          </DTypography>
                        </li>
                      ))}
                    </ul>{" "}
                    <DTypography variant="s5">
                      {i.inflections.join(" | ")}
                    </DTypography>
                  </div>
                  <div style={{ height: 2 }} />
                  <DTypography variant="s1">{i.definition}</DTypography>
                  <DTypography variant="s3">{i.translation}</DTypography>
                  <ul className="mb-2">
                    {i.examples.map(({ from, to }, index) => (
                      <li key={index}>
                        <DTypography variant="s2">{from}</DTypography>
                        {to && <DTypography variant="s4">{to}</DTypography>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {i.phrases.map((i, index) => (
                <div key={index}>
                  <DTypography variant="h1">{i.title}</DTypography>
                  <div style={{ height: 4 }} />
                  <DTypography variant="s1">{i.definition}</DTypography>
                  <div style={{ height: 4 }} />
                  <ul className="mb-2">
                    {i.examples.map(({ from, to }, index) => (
                      <li key={index}>
                        <DTypography variant="s2">{from}</DTypography>
                        {to && <DTypography variant="s4">{to}</DTypography>}
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
        phrases: Array.from(i.querySelectorAll(".phrase-block")).map((i) => ({
          title: i.querySelector(".phrase-title")?.textContent,
          label: i.querySelector(".epp-xref")?.textContent,
          definition: i.querySelector(".def")?.textContent,
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
