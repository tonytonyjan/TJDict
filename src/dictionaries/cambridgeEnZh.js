import cambridgeCore from "./cambridgeCore";

const cambridgeEnZh = async (query) =>
  cambridgeCore(
    fetch(
      `https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${encodeURIComponent(
        query
      )}`
    )
  );

cambridgeEnZh.displayName = "CambridgeZH";
cambridgeEnZh.fullName = "Cambridge 劍橋英漢詞典";

export default cambridgeEnZh;
