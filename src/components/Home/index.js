import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faWrench } from "@fortawesome/free-solid-svg-icons";
import coverImage from "./cover.png";

const Home = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md">
        <img src={coverImage} className="img-fluid" />
      </div>
      <div className="col-md">
        <h1 className="pb-2 mt-4 mb-2 border-bottom">使用說明</h1>
        <ul>
          <li>
            在網頁上 <code>Ctrl</code> + 滑鼠雙擊單字
          </li>
          <li>
            在網頁上 <code>Ctrl</code> + <code>Alt</code> + 滑鼠拖曳反白單字
          </li>
          <li>反白單字後右鍵</li>
          <li>
            Mac 使用者請用 <code>Cmd</code> 取代 <code>Ctrl</code>
          </li>
        </ul>
        <a
          href="https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp/reviews"
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-primary btn-lg"
          role="button"
        >
          <FontAwesomeIcon fixedWidth icon={faComment} /> 評論
        </a>
        <a
          href="https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp/support"
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-primary btn-lg ml-1"
          role="button"
        >
          <FontAwesomeIcon fixedWidth icon={faWrench} /> 報修
        </a>
      </div>
    </div>
  </div>
);
export default Home;
