import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";
import App from "components/App";
import Settings from "components/Settings";

export const Basic = () => (
  <App>
    <Settings
      {...actions("onNavigate")}
      navigation={select("Navigation", ["general", "dictionaries"], "general")}
    />
  </App>
);

export default {
  title: "Settings",
  component: Settings,
  decorators: [withKnobs],
};
