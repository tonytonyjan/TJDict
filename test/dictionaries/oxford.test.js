import oxford from "dictionaries/oxford";
import { actRender } from "testHelpers";

describe("Oxford", () => {
  it("correct ID", () => {
    expect(oxford.name).toBe("oxford");
  });
  it("found en", async () => {
    actRender(await oxford("test"), (container) => {
      const text = container.textContent;
      expect(
        text.includes("A procedure intended to establish the quality")
      ).toBeTrue();
    });
  });

  it("not found", async () => {
    expect(await oxford("123123123")).toBeNull();
  });
});
