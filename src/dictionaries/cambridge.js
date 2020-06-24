import React, { Fragment } from "react";

const cambridge = async (query) => {
  const response = await fetch(
    `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(
      query
    )}`
  );
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
          return (
            <div key={i}>
              <p className="lead">
                {badge && (
                  <span className="badge badge-secondary">{badge}</span>
                )}{" "}
                {block.querySelector(".def").textContent}
              </p>
              <ul>
                {Array.from(block.querySelectorAll(".examp")).map(
                  (examp, i) => (
                    <li key={i}>{examp.textContent}</li>
                  )
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </Fragment>
  ));
};

cambridge.displayName = "Cambridge 英英";

export default cambridge;
