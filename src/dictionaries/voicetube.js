import React from "react";
import { Switch } from "react-router-dom";

const voicetube = async (query) => {
  const response = await fetch(
    `https://tw.voicetube.com/definition/${encodeURIComponent(
      query
    )}?format=json&mtc=tjdict`
  );
  if (!response.ok) throw new Error("not ok");
  const { videos, translate } = await response.json();
  if (!translate) return null;
  const dom = new DOMParser().parseFromString(translate, "text/html");
  const list = Array.from(dom.body.childNodes).reduce(
    ({ definitions, examples, state }, current) => {
      let newState = state;
      if (current instanceof HTMLBRElement)
        switch (state) {
          case "解釋":
            definitions.push("\n");
            break;
          case "例句":
            examples.push("\n");
            break;
        }
      else if (current instanceof HTMLHeadingElement)
        newState = current.textContent.trim();
      else
        switch (state) {
          case "解釋":
            definitions.push(current.textContent);
            break;
          case "例句":
            examples.push(current.textContent);
            break;
        }
      return { definitions, examples, state: newState };
    },
    { definitions: [], examples: [], state: "" }
  );
  list.definitions = list.definitions.join("").trim().split(/\n+/);
  list.examples = list.examples
    .join("")
    .trim()
    .split(/\n+/)
    .reduce((acc, current, index) => {
      if (index % 2 == 0) acc.push([current]);
      else acc[acc.length - 1].push(current);
      return acc;
    }, []);
  return (
    <div>
      <ul className="list-unstyled">
        {list.definitions.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
      <ul>
        {list.examples.map(([en, zh], index) => (
          <li key={index}>
            {en}
            <div className="text-secondary">{zh}</div>
          </li>
        ))}
      </ul>
      <ul className="list-unstyled">
        {Object.values(videos).map((video) => (
          <li className="media mt-1" key={video.info.id}>
            <a
              className="mr-3"
              href={`https://tw.voicetube.com/videos/${video.info.id}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`https://cdn.voicetube.com/assets/thumbnails/${video.info.youtube}.jpg`}
                width="100"
              />
            </a>
            <div className="media-body">
              <div className="mt-0 h6">{video.info.title}</div>
              <ol>
                {video.captions.map((caption, index) => (
                  <li key={video.captions_id[index]}>
                    <a
                      href={`https://tw.voicetube.com/videos/${video.info.id}/${video.captions_id[index]}?word=${query}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {caption}
                    </a>
                    <div className="text-secondary">
                      {video.captions_zh[index]}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

voicetube.displayName = "VoiceTube 英漢 影音";

export default voicetube;
