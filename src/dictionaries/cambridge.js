import cambridgeCore from "./cambridgeCore";

const cambridge = async (query) =>
  cambridgeCore(
    fetch(
      `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(
        query
      )}`
    )
  );

cambridge.displayName = "Cambridge 英英";

export default cambridge;
