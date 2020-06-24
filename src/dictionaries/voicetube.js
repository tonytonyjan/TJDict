import React from "react";

const voicetube = (query) =>
  fetch(
    `https://tw.voicetube.com/definition/${encodeURIComponent(
      query
    )}?format=json&mtc=tjdict`
  )
    .then((response) => {
      if (!response.ok) throw new Error("not ok");
      return response.json();
    })
    .then(({ videos, translate }) => {
      if (!translate) return null;
      const dom = new DOMParser().parseFromString(translate, "text/html");
      dom.querySelectorAll('[href*="/definition/"]').forEach((a) => {
        a.href = `/index.html#/q/${a.href.match(/\/definition\/([^/?]*)/)[1]}`;
      });
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: dom.body.innerHTML }} />
          <ul className="list-unstyled">
            {Object.values(videos).map((video) => (
              <li className="media" key={video.info.id}>
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
                  <h6 className="mt-0">{video.info.title}</h6>
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
                        <br />
                        {video.captions_zh[index]}
                      </li>
                    ))}
                  </ol>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    })
    .catch(() => null);

voicetube.displayName = "VoiceTube 英漢 影音";

export default voicetube;
