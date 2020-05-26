import React from "react";
import logoImage from "./logo.png";

const About = () => (
  <div className="container py-3">
    <article>
      <div className="media">
        <img src={logoImage} className="mr-3 rounded" alt="TJDict" />
        <div className="media-body">
          <h2 className="mt-0">
            TJDict <small className="text-secondary">多核心網路辭典</small>
          </h2>
          TJDict
          是一套可以整合網路上各大網路字典且可以日漸擴充的瀏覽器擴充應用。
          <ul>
            <li>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://chrome.google.com/webstore/detail/tjdict-%E7%B7%9A%E4%B8%8A%E5%AD%97%E5%85%B8/caafmojgjlbflohillejdmnghkpcjjpp/reviews"
              >
                意見回饋
              </a>
              （給我一點鼓勵和一些星星吧XD）
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
);
export default About;
