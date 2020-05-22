import voicetube from "dictionaries/voicetube";
import { render } from "react-dom";

describe("Voicetube", () => {
  it("correct ID", () => {
    expect(voicetube.name).toBe("voicetube");
  });
  it("found en", async () => {
    const result = await voicetube("test");
    const container = document.createElement("div");
    render(result, container, () => {
      expect(container.textContent.includes("試驗")).toBeTrue();
    });
  });
  it("not found", async () => {
    expect(await voicetube("123123123")).toBeNull();
  });
});
