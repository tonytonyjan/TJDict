const matcher = {
  ja: /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/,
  en: /^\w+/,
  zh: /^[\u4E00-\u9FFF]+$/,
};

export default (text) =>
  Object.entries(matcher)
    .filter(([, regex]) => text.match(regex))
    .map(([lang]) => lang);
