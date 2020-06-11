import voicetube from "dictionaries/voicetube";
import { actRender } from "testHelpers";

describe("Voicetube", () => {
  it("correct ID", () => {
    expect(voicetube.name).toBe("voicetube");
  });
  it("found en", async () => {
    actRender(await voicetube("test"), (container) => {
      expect(container.textContent.includes("試驗")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await voicetube("123123123")).toBeNull();
  });
});
