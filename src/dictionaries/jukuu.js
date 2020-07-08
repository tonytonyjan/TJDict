import React from "react";

const jukuu = async (query) => {
  const response = await fetch(
    `http://www.jukuu.com/search.php?q=${encodeURIComponent(query)}`,
    {
      referrerPolicy: "no-referrer",
    }
  );
  if (!response.ok) throw new Error("not ok");
  const dom = new DOMParser().parseFromString(
    await response.text(),
    "text/html"
  );
  const trs1 = dom.querySelectorAll("tr.e > td:nth-child(2)");
  if (trs1.length === 0) return null;
  const trs2 = dom.querySelectorAll("tr.c > td:nth-child(2)");
  const pairs = Array.from(trs1).map((v, i) => [v, trs2[i]]);
  return (
    <ul>
      {pairs.map(([t1, t2], index) => (
        <li key={index}>
          {t1.textContent}
          <br />
          <p className="text-muted">{t2.textContent}</p>
        </li>
      ))}
    </ul>
  );
};

jukuu.displayName = "句酷";
jukuu.fullName = "句酷英漢例句庫";

export default jukuu;
