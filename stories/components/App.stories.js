import React from "react";
import { actions } from "@storybook/addon-actions";
import App from "components/App";

export const Basic = () => (
  <App query="test" {...actions("onNavigate", "onSubmit", "onClickSpeak")} />
);

export default {
  title: "App",
  component: App,
};
