import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import avatar from "./avatar.png";
import banana from "./banana.png";

const About = () => (
  <div className="container py-3">
    <article>
      <h1 className="pb-2 mb-2 border-bottom">
        關於 TJDict{" "}
        <small className="text-secondary h4">一鍵查詢多本字典的外掛</small>
      </h1>
      <p>
        TJDict
        是一套整合各大網路字典的瀏覽器擴充應用，包含中、英、日等雙語字典，只要
        control 鍵加上兩下滑鼠左鍵即可快速查詢。
      </p>
      <p>
        開發自 2012
        年，當年筆者還是個飽受英文論文所苦的大學生，總是開一堆字典交叉查詢覺得很不方便，於是做出了這個字典工具來解決問題。
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
      <h2 className="pb-2 mb-2 border-bottom">筆者與他的快樂夥伴</h2>
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
      <div className="media mt-3">
        <div className="d-flex flex-column align-items-center">
          <img
            src={banana}
            className="rounded-circle"
            width="128"
            style={{ backgroundColor: "gold" }}
          />
          <h2 className="h4 mt-1 mb-0">強力蕉</h2>
        </div>
        <div className="media-body ml-3">
          <p>
            左腦做 UX ，右腦搞
            UI，我強力蕉啦！興趣是研究人類，專長是大腦左右互搏後再自爆。屬性內向，接觸陌生人會造成
            10
            點傷害，回血方式是聞新書的味道，最近聞的書是易用性指標和眼動儀主題。夢想是在
            99 歲前點滿 UX 技能樹。
          </p>
          <p>
            我沒有朋友！如果你是 UX 或 UI，有在用
            TJDict，而且是個好人，歡迎找我做朋友！
          </p>
        </div>
      </div>
    </article>
  </div>
);
export default About;
