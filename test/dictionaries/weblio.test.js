import weblio from "dictionaries/weblio";

describe("Weblio", () => {
  it("correct ID", () => {
    expect(weblio.name).toBe("weblio");
  });
  it("found", async () => {
    const result = await weblio("仕事");
    expect(result.textContent.includes("するべきこと")).toBeTrue();
  });
  it("not found", async () => {
    expect(await weblio("123123123")).toBeNull();
  });
});
