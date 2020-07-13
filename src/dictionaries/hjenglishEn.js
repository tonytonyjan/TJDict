import hjenglishCore from "./hjenglishCore";

const hjenglishEn = async (query) =>
  hjenglishCore(
    fetch(`https://dict.hjenglish.com/w/${encodeURIComponent(query)}`)
  );

hjenglishEn.displayName = "滬江小D英文";
hjenglishEn.fullName = "滬江小D 英漢字典";

export default hjenglishEn;
