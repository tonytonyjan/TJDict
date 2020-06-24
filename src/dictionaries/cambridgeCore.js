import React, { Fragment } from "react";

export default async (fetchPromise) => {
  const response = await fetchPromise;
  if (!response.ok) throw new Error("not ok");

  const body = await response.text();
  const dom = new DOMParser().parseFromString(body, "text/html");
  const entries = dom.querySelectorAll(".entry-body__el");
  if (entries.length === 0) return null;
  return Array.from(entries).map((element, i) => (
    <Fragment key={i}>
      <h3>
        {element.querySelector(".hw.dhw").textContent}{" "}
        <small className="text-muted">
          {element.querySelector(".posgram").textContent}
        </small>
      </h3>
      <div>
        {Array.from(element.querySelectorAll(".def-block")).map((block, i) => {
          const badge = block.querySelector(".def-info").textContent.trim();
          const trans = block.querySelector(".def-body > .trans:first-child");
          return (
            <div key={i}>
              <p className="lead">
                {badge && (
                  <span className="badge badge-secondary">{badge}</span>
                )}{" "}
                {block.querySelector(".def").textContent}
              </p>
              <p className="lead text-muted">{trans && trans.textContent}</p>
              <ul>
                {Array.from(block.querySelectorAll(".examp")).map(
                  (examp, i) => {
                    const secondLine = examp.querySelector("span:nth-child(2)");
                    return (
                      <li key={i}>
                        {examp.querySelector("span:first-child").textContent}
                        {secondLine && (
                          <Fragment>
                            <br />
                            <p className="text-muted">
                              {secondLine.textContent}
                            </p>
                          </Fragment>
                        )}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </Fragment>
  ));
};
