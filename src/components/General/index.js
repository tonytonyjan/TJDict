import React from "react";
import PropTypes from "prop-types";

const displayOptions = ["window", "tab"];
const kanjiPronounciationOptions = ["ja", "zh"];

const General = ({
  display,
  autoPronounce,
  kanjiPronounciation,
  autoClose,
  onChange,
}) => {
  const handleChange = ({ currentTarget: input }) => {
    switch (input.type) {
      case "checkbox":
        onChange({ key: input.name, value: input.checked });
        break;
      case "radio":
        onChange({ key: input.name, value: input.value });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-3 pt-0">自動發音</legend>
          <div className="col-sm-9">
            <div className="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                className="custom-control-input"
                name="autoPronounce"
                value="true"
                id="customSwitch1"
                onChange={handleChange}
                defaultChecked={autoPronounce}
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
              ></label>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-3 pt-0">自動關閉視窗</legend>
          <div className="col-sm-9">
            <div className="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                className="custom-control-input"
                name="autoClose"
                value="true"
                id="autoCloseSwitch"
                onChange={handleChange}
                defaultChecked={autoClose}
              />
              <label
                className="custom-control-label"
                htmlFor="autoCloseSwitch"
              ></label>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-3 pt-0">顯示</legend>
          <div className="col-sm-9">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                name="display"
                id="displayWindow"
                value="window"
                onChange={handleChange}
                defaultChecked={display === "window"}
              />
              <label className="custom-control-label" htmlFor="displayWindow">
                視窗
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                name="display"
                id="displayTab"
                value="tab"
                onChange={handleChange}
                defaultChecked={display === "tab"}
              />
              <label className="custom-control-label" htmlFor="displayTab">
                分頁
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-3 pt-0">漢字發音</legend>
          <div className="col-sm-9">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                name="kanjiPronounciation"
                id="kanjiPronounciationJa"
                value="ja"
                onChange={handleChange}
                defaultChecked={kanjiPronounciation === "ja"}
              />
              <label
                className="custom-control-label"
                htmlFor="kanjiPronounciationJa"
              >
                日文
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                name="kanjiPronounciation"
                id="kanjiPronounciationZh"
                value="zh"
                onChange={handleChange}
                defaultChecked={kanjiPronounciation === "zh"}
              />
              <label
                className="custom-control-label"
                htmlFor="kanjiPronounciationZh"
              >
                中文
              </label>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

General.propTypes = {
  display: PropTypes.oneOf(displayOptions).isRequired,
  autoPronounce: PropTypes.bool.isRequired,
  kanjiPronounciation: PropTypes.oneOf(kanjiPronounciationOptions).isRequired,
  autoClose: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

General.defaultProps = {
  display: "window",
  autoPronounce: true,
  kanjiPronounciation: "ja",
  autoClose: true,
  onChange: () => {},
};

export default General;
