import yahoo from "dictionaries/yahoo";

describe("Yahoo", () => {
  it("correct ID", () => {
    expect(yahoo.name).toBe("yahoo");
  });
  it("found en", async () => {
    const result = await yahoo("test");
    expect(result.textContent.includes("試驗")).toBeTrue();
    expect(result.textContent.includes("He had a blood test.")).toBeTrue();
  });
  it("found en", async () => {
    const result = await yahoo("tested");
    expect(result.textContent.includes("test的動詞過去式")).toBeTrue();
  });
  it("found zh", async () => {
    const result = await yahoo("測試");
    expect(result.textContent.includes("a test run")).toBeTrue();
  });
  it("not found", async () => {
    expect(await yahoo("123123123")).toBeNull();
  });
});
