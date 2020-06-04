import React from "react";
import App from "components/App";
import NotFound from "components/NotFound";

export const Basic = () => (
  <App>
    <NotFound />
  </App>
);

export default {
  title: "NotFound",
  component: NotFound,
};
