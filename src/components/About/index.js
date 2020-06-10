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
        TJDict
        是一款整合型多核心網路字典，只要查詢一個單字，就能得到多個字典的查詢結果，提供快速簡單的字典查詢體驗，且字典能逐漸擴充。
      </p>
      <p>
        開發自
        2012，當年筆者還是個飽受英文論文所苦的大學生，總是開一堆字典交叉查詢覺得很不方便，於是做了一個工具解決自己的問題。
      </p>
      <p>
        筆者自上線以來不斷用工作之餘的時間開發，若你也喜歡這個軟體，不妨
        <a
          href="https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp/reviews"
          target="_blank"
          rel="noreferrer noopener"
        >
          給 TJDict 一些星星
        </a>
        ，你的鼓勵與意見會是筆者持續開發的動力：）
      </p>
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
            寫程式，也會彈琴。右手寫程式，左手寫音樂，所以會厚臉皮地自稱雙鍵盤手。興趣是寫程式和作曲，專長是寫
            bug 和寫
            email。大半職涯都在新創公司和開原軟體的世界玩耍，夢想自己的程式碼能對世界有幫助。
          </p>

          <p>最近因肺炎疫情剛失業，在家養身玩動物森友會之外，也開發 TJDict。</p>
        </div>
      </div>
    </article>
  </div>
);
export default About;
