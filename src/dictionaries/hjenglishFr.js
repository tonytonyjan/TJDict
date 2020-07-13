import hjenglishCore from "./hjenglishCore";

const hjenglishFr = async (query) =>
  hjenglishCore(
    fetch(`https://dict.hjenglish.com/fr/${encodeURIComponent(query)}`)
  );

hjenglishFr.displayName = "滬江小D法文";
hjenglishFr.fullName = "滬江小D 法中字典";

export default hjenglishFr;
