import React from "react";
import App from "components/App";
import History from "components/History";
import { actions } from "@storybook/addon-actions";

export const Basic = () => (
  <App>
    <History
      records={[
        { type: "text", text: "hello world" },
        ...Array.apply(null, { length: 5 }).map((_, i) => ({
          type: "data",
          id: i.toString(),
          time: "2020-11-23T11:22:11",
          query: "test",
        })),
      ]}
      {...actions("onRemoveRecord", "onClearHistory")}
    />
  </App>
);

export const EmptyHistory = () => (
  <App>
    <History records={[]} {...actions("onRemoveRecord", "onClearHistory")} />
  </App>
);

export default {
  title: "History",
  component: History,
};
