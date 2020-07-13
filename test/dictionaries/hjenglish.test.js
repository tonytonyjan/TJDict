import hjenglish from "dictionaries/hjenglish";
import { actRender } from "testHelpers";

describe("Hjenglish", () => {
  it("correct ID", () => {
    expect(hjenglish.name).toBe("hjenglish");
  });
  it("found", async () => {
    actRender(await hjenglish("試験"), (container) => {
      const text = container.textContent;
      expect(text.includes("物の性質や力などをためすこと")).toBeTrue();
      expect(text.includes("入学考试")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await hjenglish("123123123")).toBeNull();
  });
});
