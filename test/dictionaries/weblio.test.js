import weblio from "dictionaries/weblio";
import { actRender } from "testHelpers";

describe("Weblio", () => {
  it("correct ID", () => {
    expect(weblio.name).toBe("weblio");
  });
  it("found", async () => {
    actRender(await weblio("仕事"), (container) => {
      const text = container.textContent;
      expect(text.includes("何かを作り出す")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await weblio("123123123")).toBeNull();
  });
});
