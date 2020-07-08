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
  const title = dom.querySelector("h3.title > span.fz-24")?.textContent;
  const pronunciation = dom.querySelector(".compList.d-ib>ul")?.textContent;
  const compList = Array.from(
    dom.querySelectorAll(".compList.p-rel > ul > li")
  );
  const compArticleList = Array.from(
    dom.querySelectorAll(".dictionaryWordCard ul.compArticleList > li")
  );
  const explanation = dom.querySelector(".grp-tab-content-explanation");
  const titles = Array.from(explanation?.querySelectorAll(".compTitle") || []);
  const list = explanation?.querySelectorAll(".compTextList") || [];
  const pairs = titles.map((e, i) => ({
    partOfSpeech: e.textContent,
    definitions: Array.from(list[i]?.querySelectorAll("li") || []).map(
      (item) => ({
        definition: item.querySelector(".d-i")?.textContent,
        examples: Array.from(item.querySelectorAll(".fc-2nd")).map(
          (i) => i.textContent
        ),
      })
    ),
  }));
  return (
    <div>
      {title && <div>{title}</div>}
      {pronunciation && <div className="text-secondary">{pronunciation}</div>}

      {compList.length > 0 && (
        <ul className="list-unstyled">
          {compList.map((item, index) => (
            <li key={index}>{item.textContent}</li>
          ))}
        </ul>
      )}

      {compArticleList.length > 0 && (
        <ul className="list-unstyled">
          {compArticleList.map((item, index) => (
            <li key={index}>{item.textContent}</li>
          ))}
        </ul>
      )}

      <ul className="list-unstyled">
        {pairs.map(({ partOfSpeech, definitions }) => (
          <li key={partOfSpeech}>
            {partOfSpeech}
            <ol>
              {definitions.map(({ definition, examples }) => (
                <li key={definition}>
                  {definition}
                  <ul className="list-unstyled">
                    {examples.map((example) => (
                      <li key={example} className="text-secondary">
                        {example}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

yahoo.displayName = "Yahoo";
yahoo.fullName = "Yahoo 奇摩英漢字典";

export default yahoo;
