import urban from "dictionaries/urban";
import { actRender } from "testHelpers";

describe("Urban", () => {
  it("correct ID", () => {
    expect(urban.name).toBe("urban");
  });
  it("found en", async () => {
    actRender(await urban("test"), (container) => {
      expect(
        container.textContent.includes("The word all students fear.")
      ).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await urban("123123123")).toBeNull();
  });
});
