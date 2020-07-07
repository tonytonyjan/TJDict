import React from "react";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { stringLiteral } from "@babel/types";

const thesaurus = async (query) => {
  const response = await fetch(
    `https://www.thesaurus.com/browse/${encodeURIComponent(query)}`
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  const ast = parse(
    Array.from(dom.querySelectorAll("script")).find((i) =>
      i.textContent.includes("window.INITIAL_STATE")
    ).textContent
  );
  let obj;
  traverse(ast, {
    enter(path) {
      if (path.isIdentifier({ name: "undefined" })) {
        path.replaceWith(stringLiteral("undefined"));
      }
      if (path.isAssignmentExpression()) {
        obj = path.node.right;
      }
    },
  });
  const {
    searchData: {
      tunaApiData: { posTabs: data },
      pageName,
    },
  } = JSON.parse(generate(obj).code);
  if (pageName === "noresult") return null;
  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="bg-primary" style={{ width: 16, height: 16 }}></div>{" "}
        <span className="ml-1">MOST RELEVANT</span>
      </div>
      {data.map(({ definition, pos, synonyms }, i) => (
        <section key={i}>
          <div className="lead">
            {definition} <small className="text-muted">{pos}</small>
          </div>
          <ul className="d-flex list-unstyled flex-wrap">
            {synonyms.map(({ term, similarity }, i) => {
              const sim = parseInt(similarity);
              return (
                <li
                  className="m-1 p-1"
                  style={{
                    backgroundColor: `rgba(0, 163, 233, ${sim / 100})`,
                    color: sim > 50 ? "white" : null,
                  }}
                  key={i}
                >
                  {term}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

thesaurus.displayName = "Thesaurus 英英 同義詞";

export default thesaurus;
