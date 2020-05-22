import urban from "dictionaries/urban";
import { render } from "react-dom";

describe("Urban", () => {
  it("correct ID", () => {
    expect(urban.name).toBe("urban");
  });
  it("found en", async () => {
    const result = await urban("test");
    const container = document.createElement("div");
    render(result, container, () => {
      expect(
        container.textContent.includes("The word all students fear.")
      ).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await urban("123123123")).toBeNull();
  });
});
