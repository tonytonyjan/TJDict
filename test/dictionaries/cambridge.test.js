import cambridge from "dictionaries/cambridge";
import { render } from "react-dom";

describe("Cambridge", () => {
  it("correct ID", () => {
    expect(cambridge.name).toBe("cambridge");
  });
  it("found en", async () => {
    const result = await cambridge("test");
    const container = document.createElement("div");
    render(result, container, () => {
      const text = container.textContent;
      expect(text.includes("a way of discovering")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await cambridge("123123123")).toBeNull();
  });
});
