import React from "react";
import App from "components/App";
import About from "components/About";

export const Basic = () => (
  <App>
    <About />
  </App>
);

export default {
  title: "About",
  component: About,
};
