import hjenglishCore from "./hjenglishCore";

const hjenglish = async (query) =>
  hjenglishCore(
    fetch(`https://dict.hjenglish.com/jp/jc/${encodeURIComponent(query)}`)
  );

hjenglish.displayName = "滬江小D";
hjenglish.fullName = "滬江小D 日中字典";

export default hjenglish;
