import cambridgeCore from "./cambridgeCore";

const cambridge = async (query) =>
  cambridgeCore(
    fetch(
      `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(
        query
      )}`
    )
  );

cambridge.displayName = "CambridgeEN";
cambridge.fullName = "Cambridge 劍橋英英詞典";

export default cambridge;
