import yahoo from "dictionaries/yahoo";
import { actRender } from "testHelpers";

describe("Yahoo", () => {
  it("correct ID", () => {
    expect(yahoo.name).toBe("yahoo");
  });
  it("en", async () => {
    actRender(await yahoo("test"), (container) => {
      const text = container.textContent;
      expect(text.includes("試驗")).toBeTrue();
      expect(text.includes("He had a blood test.")).toBeTrue();
    });
  });
  it("past tense", async () => {
    actRender(await yahoo("tested"), (container) => {
      expect(container.textContent.includes("test的動詞過去式")).toBeTrue();
    });
  });
  it("zh", async () => {
    actRender(await yahoo("測試"), (container) => {
      expect(container.textContent.includes("a test run")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await yahoo("123123123")).toBeNull();
  });
});
