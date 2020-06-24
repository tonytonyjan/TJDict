import React from "react";

const urban = (query) =>
  fetch(
    `https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
      query
    )}`
  )
    .then((response) => {
      if (!response.ok) throw new Error("not ok");
      return response.text();
    })
    .then((body) => {
      const dom = new DOMParser().parseFromString(body, "text/html");
      return (
        <div>
          {Array.from(dom.querySelectorAll(".def-panel[data-defid]")).map(
            (i, index) => (
              <div className="panel panel-info" key={index}>
                <div className="panel-heading">
                  <h3 className="panel-title">
                    {i.querySelector(".word").childNodes[0].nodeValue}
                  </h3>
                </div>
                <div
                  className="panel-body"
                  dangerouslySetInnerHTML={{
                    __html: i.querySelector(".meaning").innerHTML,
                  }}
                ></div>
                <div className="panel-footer">
                  <h5>Example</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: i.querySelector(".example").innerHTML,
                    }}
                  ></div>
                </div>
              </div>
            )
          )}
        </div>
      );
    })
    .catch(() => null);

urban.displayName = "Urban 英英 俚語";

export default urban;
