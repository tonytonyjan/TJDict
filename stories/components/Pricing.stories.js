import React from "react";
import App from "components/App";
import Pricing from "components/Pricing";

export const Basic = () => (
  <App>
    <Pricing />
  </App>
);

export default {
  title: "Pricing",
  component: Pricing,
};
