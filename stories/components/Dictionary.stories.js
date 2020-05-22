import React from "react";
import Dictionary from "components/Dictionary";
import { withKnobs, text } from "@storybook/addon-knobs";
import yahoo from "dictionaries/yahoo";
import weblio from "dictionaries/weblio";
import voicetube from "dictionaries/voicetube";
import urban from "dictionaries/urban";
import oxford from "dictionaries/oxford";
import jukuu from "dictionaries/jukuu";

export default { title: "Dictionary", decorators: [withKnobs] };

export const yahooDict = () => (
  <Dictionary query={text("Query", "test")} dict={yahoo} />
);
export const weblioDict = () => (
  <Dictionary query={text("Query", "試験")} dict={weblio} />
);
export const voicetubeDict = () => (
  <Dictionary query={text("Query", "test")} dict={voicetube} />
);
export const urbanDict = () => (
  <Dictionary query={text("Query", "test")} dict={urban} />
);
export const oxfordDict = () => (
  <Dictionary query={text("Query", "test")} dict={oxford} />
);
export const jukuuDict = () => (
  <Dictionary query={text("Query", "test")} dict={jukuu} />
);
