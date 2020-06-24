import React from "react";

const yahoo = async (query) => {
  const response = await fetch(
    `https://tw.dictionary.search.yahoo.com/search?p=${encodeURIComponent(
      query
    )}`
  );
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  if (
    !dom.querySelector(".tabsContent-s") &&
    !dom.querySelector(".grp.grp-main")
  )
    return null;
  const result = [];
  let content;
  if ((content = dom.querySelector("h3.title > span.fz-24")))
    result.push(<h3 key="1">{content.textContent}</h3>);
  if ((content = dom.querySelector(".compList.d-ib>ul")))
    result.push(
      <h5 key="pronunciation" className="text-secondary">
        {content.textContent}
      </h5>
    );
  if (
    (content = dom.querySelectorAll(".first .compList.d-ib>ul>li")).length > 0
  )
    <ul className="list-unstyled d-flex">
      {Array.from(content).map((element, i) => (
        <li key={i} className="ml-2">
          {element.textContent}
        </li>
      ))}
    </ul>;
  if ((content = dom.querySelector(".grp-tab-content-explanation"))) {
    const titles = Array.from(content.querySelectorAll(".compTitle") || []);
    const lists = content.querySelectorAll(".compTextList");
    const pairs = titles.map((e, i) => [e, lists[i]]);
    result.push(
      <div key="2">
        {pairs.map(([title, list], i) => (
          <section key={i}>
            <h3 className="d-flex align-items-center">
              <span className="badge badge-primary">
                {title.querySelector(".pos_button").textContent}
              </span>
              <span className="ml-1">
                {title.querySelector(".title").textContent}
              </span>
            </h3>
            <ol>
              {Array.from(list.querySelectorAll("li")).map((element, i) => (
                <li key={i}>
                  <span className="lead">
                    {element.querySelector(".d-i").textContent}
                  </span>
                  <ul className="list-unstyled">
                    {Array.from(element.querySelectorAll(".fc-2nd")).map(
                      (example, i) => (
                        <li key={i} className="text-muted">
                          {example.textContent}
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    );
  } else if ((content = dom.querySelector(".first .dictionaryExplanation"))) {
    result.push(
      <div key="3" className="lead">
        {content.textContent}
      </div>
    );
  }
  return result;
};

yahoo.displayName = "Yahoo 英漢";

export default yahoo;
