import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import avatar from "./avatar.png";

const About = () => (
  <div className="container py-3">
    <article>
      <h1 className="pb-2 mb-2 border-bottom">
        TJDict <small className="text-secondary h4">多核心網路辭典</small>
      </h1>
      <p>
        TJDict 是一套可以整合網路上各大網路字典且可以日漸擴充的瀏覽器擴充應用。
      </p>
      <p>
        開發自 2012
        年，當年筆者還是個飽受英文論文所苦的大學生，總是開一堆字典交叉查詢覺得很不方便，於是做了一個工具解決自己的問題。本來是自用，但在朋友慫恿下公開出來，終得以幫助更多的人。
      </p>
      <p></p>
      <h1 className="pb-2 mb-2 border-bottom">關於作者</h1>
      <div className="media">
        <div className="d-flex flex-column align-items-center">
          <img
            src={avatar}
            className="rounded-circle"
            width="128"
            alt="tonytonyjan"
          />
          <h2 className="h4 mt-1 mb-0">大兜</h2>
          <div className="row">
            <a
              className="text-reset text-decoration-none"
              href="https://tonytonyjan.net"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon fixedWidth icon={faHome} />
            </a>
            <a
              className="text-reset text-decoration-none ml-1"
              href="mailto:tonytonyjan@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon fixedWidth icon={faEnvelope} />
            </a>
            <a
              className="text-reset text-decoration-none ml-1"
              href="https://github.com/tonytonyjan"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon fixedWidth icon={faGithub} />
            </a>
          </div>
        </div>
        <div className="media-body ml-3">
          <p>
            寫程式的，也會彈琴，右手寫程式，左手寫音樂，所以會厚臉皮地自稱雙鍵盤手。興趣是寫程式和作曲，專長是寫
            bug 和寫
            email。大半職涯都在新創公司和開原軟體的世界中遊走，夢想自己的程式碼能對世界有幫助。
          </p>

          <p>最近因肺炎疫情剛失業，在家養身玩動物森友會之外，也開發 TJDict。</p>
        </div>
      </div>
    </article>
  </div>
);
export default About;
