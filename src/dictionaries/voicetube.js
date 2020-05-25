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
          {Object.values(videos).map((video) => (
            <div className="media" key={video.info.id}>
              <div className="media-left">
                <a
                  href={`https://tw.voicetube.com/videos/${video.info.id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    className="media-object"
                    src={`https://cdn.voicetube.com/assets/thumbnails/${video.info.youtube}.jpg`}
                    height="100px"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{video.info.title}</h4>
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
            </div>
          ))}
        </div>
      );
    })
    .catch(() => null);

export default voicetube;
