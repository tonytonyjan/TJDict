import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const Dictionary = ({ query, dict, onFound, rootRef }) => {
  const [content, setContent] = useState(null);
  const [found, setFound] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setContent(null);
    setFound(false);
    let isCancelled = false;
    dict(query).then((node) => {
      if (isCancelled || !node) return;
      setFound(true);
      if (node.nodeType !== undefined) {
        while (contentRef.current.firstChild)
          contentRef.current.removeChild(contentRef.current.firstChild);
        contentRef.current.appendChild(node);
      } else if (React.isValidElement(node)) {
        setContent(node);
      }
      onFound(dict.name);
    });
    return () => (isCancelled = true);
  }, [query]);

  return (
    found && (
      <div ref={rootRef}>
        <h2 className="pb-2 mt-4 mb-2 border-bottom">{dict.name}</h2>
        <div ref={contentRef}>{content}</div>
      </div>
    )
  );
};

Dictionary.propTypes = {
  query: PropTypes.string.isRequired,
  dict: PropTypes.func.isRequired,
  onFound: PropTypes.func,
  rootRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Dictionary.defaultProps = {
  onFound: () => {},
};

export default Dictionary;
