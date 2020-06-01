import React from "react";
import App from "components/App";
import Query from "components/Query";

const longContent = (
  <div style={{ height: 512, backgroundColor: "yellow" }}>long content</div>
);

export const Basic = () => (
  <Query
    dictionaries={[
      { id: "foo", title: "FOO", content: longContent },
      { id: "bar", title: "BAR", content: longContent },
      { id: "buz", title: "BUZ", content: longContent },
    ]}
  />
);
export const NotFound = () => <Query notFound />;

export default {
  title: "Query",
  component: Query,
  decorators: [(fn) => <App>{fn()}</App>],
};
