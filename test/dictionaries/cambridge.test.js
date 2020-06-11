import cambridge from "dictionaries/cambridge";
import { actRender } from "testHelpers";

describe("Cambridge", () => {
  it("correct ID", () => {
    expect(cambridge.name).toBe("cambridge");
  });
  it("found en", async () => {
    actRender(await cambridge("test"), (container) => {
      expect(container.textContent.includes("a way of discovering")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await cambridge("123123123")).toBeNull();
  });
});
