import React from "react";
import Donate from "components/Donate";
import App from "components/App";
import { actions } from "@storybook/addon-actions";

const props = {
  items: [
    {
      id: "1",
      name: "foo",
      description: "bar",
      price: 123,
      disabled: true,
    },
    {
      id: "2",
      name: "foo",
      description: "bar",
      price: 123,
      disabled: true,
    },
    {
      id: "3",
      name: "foo",
      description: "bar",
      price: 123,
      disabled: false,
    },
    {
      id: "4",
      name: "foo",
      description: "bar",
      price: 123,
      disabled: false,
    },
  ],
  reviewUrl: "",
  ...actions("onDonate"),
};

export const Basic = () => (
  <App>
    <Donate {...props} />
  </App>
);

export const Smile = () => (
  <App>
    <Donate {...props} smile />
  </App>
);

export default {
  title: "Donate",
  component: Donate,
};
