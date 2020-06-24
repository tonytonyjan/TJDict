import cambridgeCore from "./cambridgeCore";

const cambridgeEnZh = async (query) =>
  cambridgeCore(
    fetch(
      `https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${encodeURIComponent(
        query
      )}`
    )
  );

cambridgeEnZh.displayName = "Cambridge 英中";

export default cambridgeEnZh;
