import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import browser from "./browser";
import "bootstrap";
import "./main.scss";

window.addEventListener("resize", () => {
  browser.runtime.sendMessage({
    type: "RESIZE",
    width: window.innerWidth,
    height: window.innerHeight,
  });
});

render(<App />, document.getElementById("root"));
