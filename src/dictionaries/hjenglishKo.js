import hjenglishCore from "./hjenglishCore";

const hjenglishKo = async (query) =>
  hjenglishCore(
    fetch(`https://dict.hjenglish.com/kr/${encodeURIComponent(query)}`)
  );

hjenglishKo.displayName = "滬江小D韓文";
hjenglishKo.fullName = "滬江小D 韓中字典";

export default hjenglishKo;
