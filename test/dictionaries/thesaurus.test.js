import thesaurus from "dictionaries/thesaurus";
import { actRender } from "testHelpers";

describe("Thesaurus", () => {
  it("correct ID", () => {
    expect(thesaurus.name).toBe("thesaurus");
  });
  it("found en", async () => {
    actRender(await thesaurus("test"), (container) => {
      const text = container.textContent;
      expect(text.includes("examination, quiz")).toBeTrue();
      expect(text.includes("assessment")).toBeTrue();
      expect(text.includes("examine, quiz")).toBeTrue();
      expect(text.includes("assess")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await thesaurus("123123123")).toBeNull();
  });
});
