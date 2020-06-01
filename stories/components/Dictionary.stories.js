import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dictionary from "components/Dictionary";
import { withKnobs, text } from "@storybook/addon-knobs";
import yahoo from "dictionaries/yahoo";
import weblio from "dictionaries/weblio";
import voicetube from "dictionaries/voicetube";
import urban from "dictionaries/urban";
import oxford from "dictionaries/oxford";
import jukuu from "dictionaries/jukuu";

const DictContainer = ({ query, dict }) => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    dict(query).then((node) => {
      if (node instanceof Node) {
        const div = document.createElement("div");
        div.appendChild(node);
        setContent(<div dangerouslySetInnerHTML={{ __html: div.innerHTML }} />);
      } else if (React.isValidElement(node)) {
        setContent(node);
      }
    });
  }, [query, dict]);
  return content ? (
    <Dictionary title={dict.name}>{content}</Dictionary>
  ) : (
    "loading..."
  );
};

DictContainer.propTypes = {
  query: PropTypes.string.isRequired,
  dict: PropTypes.func,
};

export const Basic = () => <Dictionary title="title">content</Dictionary>;

export const Yahoo = () => (
  <DictContainer query={text("Query", "test")} dict={yahoo} />
);
export const Weblio = () => (
  <DictContainer query={text("Query", "試験")} dict={weblio} />
);
export const Voicetube = () => (
  <DictContainer query={text("Query", "test")} dict={voicetube} />
);
export const Urban = () => (
  <DictContainer query={text("Query", "test")} dict={urban} />
);
export const Oxford = () => (
  <DictContainer query={text("Query", "test")} dict={oxford} />
);
export const Jukuu = () => (
  <DictContainer query={text("Query", "test")} dict={jukuu} />
);

export default {
  title: "Dictionary",
  component: Dictionary,
  decorators: [withKnobs],
};
