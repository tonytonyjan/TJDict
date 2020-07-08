import React, { useRef } from "react";
import { actions } from "@storybook/addon-actions";
import App from "components/App";

const dataList = ["apple", "app", "application"];

export const Basic = () => (
  <App
    query="test"
    dataList={dataList}
    phoneticTranscription="test"
    {...actions("onNavigate", "onSubmit", "onClickSpeak")}
  />
);

export default {
  title: "App",
  component: App,
};
