import React from "react";
import { actions } from "@storybook/addon-actions";
import App from "components/App";
import Settings from "components/Settings";
import Dictionaries from "components/Dictionaries";

export const Basic = () => (
  <App>
    <Settings navigation="general">
      <Dictionaries
        {...actions(
          "onAddDictionary",
          "onMoveUpDictionary",
          "onRemoveDictionary"
        )}
        dictionaryIds={["yahoo", "urban", "weblio"]}
        unusedDictionaryIds={["yahoo", "urban", "weblio"]}
      />
    </Settings>
  </App>
);

export default {
  title: "Dictionaries",
  component: Dictionaries,
};
