import React from "react";
import { actions } from "@storybook/addon-actions";
import App from "components/App";

const dataList = ["apple", "app", "application"];

export const Basic = () => (
  <App
    query="test"
    dataList={dataList}
    {...actions("onNavigate", "onSubmit", "onClickSpeak")}
  />
);

export default {
  title: "App",
  component: App,
};
