import "ga";
import React from "react";
import { render } from "react-dom";
import Root from "./components/Root";
import browser from "./browser";
import "bootstrap";
import "./main.scss";
import "./content";

window.addEventListener("resize", () => {
  browser.runtime.sendMessage({
    type: "RESIZE",
    width: window.innerWidth,
    height: window.innerHeight,
  });
});

render(<Root />, document.getElementById("root"));
