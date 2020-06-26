import React, { Fragment } from "react";

export default async (fetchPromise) => {
  const response = await fetchPromise;
  if (!response.ok) throw new Error("not ok");

  const body = await response.text();
  const dom = new DOMParser().parseFromString(body, "text/html");
  const entries = dom.querySelectorAll(".entry-body__el");
  if (entries.length === 0) return null;
  let tmp;
  return Array.from(entries).map((element, i) => (
    <Fragment key={i}>
      <h3>
        {element.querySelector(".hw.dhw").textContent}{" "}
        <small className="text-muted">
          {(tmp = element.querySelector(".posgram")) && tmp.textContent}
        </small>
      </h3>
      <div>
        {Array.from(element.querySelectorAll(".def-block")).map((block, i) => {
          return (
            <div key={i}>
              <p className="lead">
                {(tmp = block.querySelector(".def-info")) && (
                  <span className="badge badge-secondary">
                    {tmp.textContent.trim()}
                  </span>
                )}{" "}
                {(tmp = block.querySelector(".def")) && tmp.textContent}
              </p>
              <p className="lead text-muted">
                {(tmp = block.querySelector(
                  ".def-body > .trans:first-child"
                )) && tmp.textContent}
              </p>
              <ul>
                {Array.from(block.querySelectorAll(".examp")).map(
                  (examp, i) => {
                    return (
                      <li key={i}>
                        {(tmp = examp.querySelector("span:first-child")) &&
                          tmp.textContent}
                        {(tmp = examp.querySelector("span:nth-child(2)")) && (
                          <Fragment>
                            <br />
                            <p className="text-muted">{tmp.textContent}</p>
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
