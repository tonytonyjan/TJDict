import React, { Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faInfoCircle,
  faVolumeDown,
  faQuestionCircle,
  faDonate,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import jquery from "jquery";

const App = ({
  query,
  dataList,
  inputRef,
  children,
  onNavigate,
  onSubmit,
  onClickSpeak,
  onInputChange,
  phoneticTranscription,
}) => {
  const speakerRef = useRef(null);
  useEffect(() => {
    const $speaker = jquery(speakerRef.current);
    $speaker.tooltip("dispose");
    if (phoneticTranscription) $speaker.tooltip();
  }, [phoneticTranscription]);
  return (
    <Fragment>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <span
            style={{ cursor: "pointer" }}
            className="navbar-brand d-none d-sm-inline-block"
            onClick={() => onNavigate("home")}
          >
            TJDict
          </span>
          <form
            className="flex-grow-1 flex-sm-grow-0 mr-sm-4"
            onSubmit={onSubmit}
          >
            <div className="input-group">
              <input
                ref={inputRef}
                name="query"
                className="form-control"
                type="search"
                placeholder="請輸入單字……"
                autoComplete="off"
                autoFocus
                defaultValue={query}
                list="autocomplete-list"
                onChange={onInputChange}
              />
              <datalist id="autocomplete-list">
                {dataList.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </datalist>
              <div className="input-group-append">
                <button
                  ref={speakerRef}
                  className="btn btn-primary"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={phoneticTranscription}
                >
                  <FontAwesomeIcon
                    fixedWidth
                    icon={faVolumeDown}
                    size="lg"
                    onClick={onClickSpeak}
                  />
                </button>
              </div>
            </div>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => onNavigate("history")}
                >
                  <FontAwesomeIcon fixedWidth icon={faHistory} /> 歷史紀錄
                </button>
              </li>
              <li className="nav-item active">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => onNavigate("settings")}
                >
                  <FontAwesomeIcon fixedWidth icon={faCog} /> 設定
                </button>
              </li>
              <li className="nav-item active">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => onNavigate("about")}
                >
                  <FontAwesomeIcon fixedWidth icon={faInfoCircle} /> 關於
                </button>
              </li>
              <li className="nav-item active">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => onNavigate("help")}
                >
                  <FontAwesomeIcon fixedWidth icon={faQuestionCircle} /> 支援
                </button>
              </li>
              <li className="nav-item active">
                <a href="https://tjdict.com/donate/" className="nav-link">
                  <FontAwesomeIcon fixedWidth icon={faDonate} /> 贊助
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </Fragment>
  );
};
App.propTypes = {
  query: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLInputElement),
  }),
  children: PropTypes.node,
  onNavigate: PropTypes.func,
  onSubmit: PropTypes.func,
  onClickSpeak: PropTypes.func,
  dataList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onInputChange: PropTypes.func,
  phoneticTranscription: PropTypes.string,
};

App.defaultProps = {
  query: "",
  onNavigate: () => {},
  onSubmit: () => {},
  onClickSpeak: () => {},
  dataList: [],
  onInputChange: () => {},
};

export default App;
