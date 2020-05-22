import oxford from "dictionaries/oxford";

describe("Oxford", () => {
  it("correct ID", () => {
    expect(oxford.name).toBe("oxford");
  });
  it("found en", async () => {
    const result = await oxford("test");
    expect(
      result.textContent.includes(
        "A procedure intended to establish the quality"
      )
    ).toBeTrue();
  });

  it("not found", async () => {
    expect(await oxford("123123123")).toBeNull();
  });
});
