import React, { Fragment } from "react";

export default async (fetchPromise) => {
  const response = await fetchPromise;
  if (!response.ok) throw new Error("not ok");

  const body = await response.text();
  const dom = new DOMParser().parseFromString(body, "text/html");
  const entries = dom.querySelectorAll(".entry-body__el");
  if (entries.length === 0) return null;
  return Array.from(entries).map((element, i) => {
    const title = element.querySelector(".hw.dhw")?.textContent;
    const partOfSpeech = element.querySelector(".posgram")?.textContent;
    const pronunciations = Array.from(
      element.querySelectorAll(".pron.dpron")
    ).map((i) => i.textContent);
    const blocks = Array.from(element.querySelectorAll(".def-block")).map(
      (i) => ({
        badge: i.querySelector(".def-info")?.textContent.trim(),
        definition: i.querySelector(".def")?.textContent,
        trans: i.querySelector(".trans:first-child")?.textContent,
        examples: Array.from(i.querySelectorAll(".examp")).map(
          (i) => i.textContent
        ),
      })
    );
    return (
      <Fragment key={i}>
        {title && <div className="lead">{title}</div>}
        {partOfSpeech && <div className="text-second">{partOfSpeech}</div>}
        {pronunciations.length > 0 && (
          <ul className="list-inline">
            {pronunciations.map((i, index) => (
              <li key={index} className="list-inline-item text-secondary">
                {i}
              </li>
            ))}
          </ul>
        )}
        {blocks.map(({ badge, definition, trans, examples }, index) => (
          <ul key={index} className="list-unstyled">
            <li>
              {badge && (
                <span className="badge badge-secondary mr-1">{badge}</span>
              )}
              {definition && <span>{definition}</span>}
              {trans && <div>{trans}</div>}
              {examples.length > 0 && (
                <ul>
                  {examples.map((i, index) => (
                    <li key={index} className="text-secondary">
                      {i}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        ))}
      </Fragment>
    );
  });
};
