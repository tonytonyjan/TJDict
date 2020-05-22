import React, { useEffect, useState, useRef } from "react";

const Dictionary = ({ query, dict }) => {
  const [content, setContent] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setContent(null);
    let isCancelled = false;
    dict(query).then((node) => {
      if (isCancelled || !node) return;
      if (node.nodeType !== undefined) {
        while (contentRef.current.firstChild)
          contentRef.current.removeChild(contentRef.current.firstChild);
        contentRef.current.appendChild(node);
      } else if (React.isValidElement(node)) {
        setContent(node);
      }
    });
    return () => (isCancelled = true);
  }, [query]);

  return (
    <div>
      <div>{query}</div>
      <div ref={contentRef}>{content}</div>
    </div>
  );
};

export default Dictionary;
