import detectLanguage from "detectLanguage";

describe("detectLanguage", () => {
  it("en", () => {
    expect(detectLanguage("hello")).toEqual(["en"]);
    expect(detectLanguage("hello你好")).toEqual(["en"]);
  });

  it("ja", () => {
    expect(detectLanguage("試験です")).toEqual(["ja"]);
  });

  it("zh", () => {
    expect(detectLanguage("測試").sort()).toEqual(["ja", "zh"]);
  });
});
