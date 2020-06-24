import cambridgeEnZh from "dictionaries/cambridgeEnZh";
import { actRender } from "testHelpers";

describe("CambridgeEnZh", () => {
  it("correct ID", () => {
    expect(cambridgeEnZh.name).toBe("cambridgeEnZh");
  });
  it("found en", async () => {
    actRender(await cambridgeEnZh("test"), (container) => {
      const text = container.textContent;
      expect(text.includes("測驗，考查")).toBeTrue();
      expect(text.includes("今天班裡有一個拼寫測驗")).toBeTrue();
      expect(text.includes("檢查；化驗")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await cambridgeEnZh("123123123")).toBeNull();
  });
});
