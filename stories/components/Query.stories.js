import React from "react";
import App from "components/App";
import Query from "components/Query";

const longContent = (
  <div style={{ height: 512, backgroundColor: "yellow" }}>long content</div>
);

const dictionaries = [
  { id: "foo", title: "FOO", content: longContent },
  { id: "bar", title: "BAR", content: longContent },
  { id: "buz", title: "BUZ", content: longContent },
];

export const Basic = () => <Query dictionaries={dictionaries} />;
export const WithBroadcast = () => (
  <Query
    broadcast={
      <a
        href="https://www.surveycake.com/s/qDygL"
        target="_blank"
        rel="noreferrer noopener"
      >
        筆者最近因疫情失業啦！於是 TJDict 2.0
        就上線了。為提升品質，想邀請你來填問卷抽潮T。
      </a>
    }
    dictionaries={dictionaries}
  />
);

export default {
  title: "Query",
  component: Query,
  decorators: [(fn) => <App>{fn()}</App>],
};
