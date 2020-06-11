import jukuu from "dictionaries/jukuu";
import { actRender } from "testHelpers";

describe("Jukuu", () => {
  it("correct ID", () => {
    expect(jukuu.name).toBe("jukuu");
  });
  it("found en", async () => {
    actRender(await jukuu("test"), (container) => {
      const text = container.textContent;
      expect(text.includes("Summative and formative evaluations")).toBeTrue();
      expect(text.includes("测试的时机为总结式和进展式评估")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await jukuu("123123123")).toBeNull();
  });
});
