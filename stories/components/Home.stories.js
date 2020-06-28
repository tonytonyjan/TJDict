import React from "react";
import App from "components/App";
import Home from "components/Home";

const historyRecords = [
  { id: "1", query: "test" },
  { id: "2", query: "test" },
  { id: "3", query: "test" },
  { id: "4", query: "test" },
  { id: "5", query: "test" },
];

export const Basic = () => (
  <App>
    <Home historyPanelProps={{ records: historyRecords, hasMore: true }} />
  </App>
);

export const EmptyHistory = () => (
  <App>
    <Home historyPanelProps={{ records: [] }} />
  </App>
);

export default {
  title: "Home",
  component: Home,
};
