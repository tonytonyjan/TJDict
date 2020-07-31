import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faWrench } from "@fortawesome/free-solid-svg-icons";
import coverImage from "./cover.png";
import HistoryPanel from "components/HistoryPanel";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Home = ({ reviewUrl, supportUrl, historyPanelProps, onNavigate }) => {
  const handleClickSettingsLink = useCallback((event) => {
    event.preventDefault();
    onNavigate("settings/dictionaries");
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <img src={coverImage} className="img-fluid" />
        </div>
        <div className="col-lg-4">
          <h2 className="pb-2 mt-4 mb-2 border-bottom">使用說明</h2>
          <p className="h6">在網頁上快速查字</p>
          <ul>
            <li>
              <code>Ctrl</code> + 雙擊單字
            </li>
            <li>
              <code>Ctrl</code> + <code>Alt</code> + 反白單字
            </li>
            <li>反白單字 + 右鍵選單</li>
            <li>
              Mac 使用者請用 <code>Cmd</code> 取代 <code>Ctrl</code>
            </li>
          </ul>
          <p className="h6">更換字典順序</p>
          <ul>
            <li>
              可自
              <FontAwesomeIcon fixedWidth icon={faCog} />
              設定頁調整，或
              <a href="#" onClick={handleClickSettingsLink}>
                點此進入
              </a>
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
  onNavigate: PropTypes.func,
};

Home.defaultProps = {
  onNavigate: () => {},
};

export default Home;
