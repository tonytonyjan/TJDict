import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

export const actRender = async (element, callbackFn) => {
  const container = document.createElement("div");
  act(() => {
    render(element, container);
  });
  callbackFn(container);
  unmountComponentAtNode(container);
  container.remove();
};
