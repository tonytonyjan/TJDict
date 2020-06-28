import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faWrench } from "@fortawesome/free-solid-svg-icons";
import coverImage from "./cover.png";
import HistoryPanel from "components/HistoryPanel";

const Home = ({ reviewUrl, supportUrl, historyPanelProps }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <img src={coverImage} className="img-fluid" />
        </div>
        <div className="col-lg-4">
          <h2 className="pb-2 mt-4 mb-2 border-bottom">使用說明</h2>
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
            href={reviewUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-primary btn-lg"
            role="button"
          >
            <FontAwesomeIcon fixedWidth icon={faComment} /> 評論
          </a>
          <a
            href={supportUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-primary btn-lg ml-1"
            role="button"
          >
            <FontAwesomeIcon fixedWidth icon={faWrench} /> 報修
          </a>
        </div>
        <div className="col-lg-4">
          <HistoryPanel {...historyPanelProps} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  reviewUrl: PropTypes.string,
  supportUrl: PropTypes.string,
  historyPanelProps: PropTypes.exact(HistoryPanel.propTypes),
};

export default Home;
