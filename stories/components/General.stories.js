import React from "react";
import { actions } from "@storybook/addon-actions";
import App from "components/App";
import Settings from "components/Settings";
import General from "components/General";

export const Basic = () => (
  <App>
    <Settings navigation="general">
      <General {...actions("onChange")} />
    </Settings>
  </App>
);

export default {
  title: "General",
  component: General,
};
