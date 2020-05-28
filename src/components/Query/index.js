import React, {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";
import Dictionary from "components/Dictionary";
import dictionaries from "dictionaries";

const Query = ({ query, dictionaryIds, onQuery }) => {
  const [contents, setContents] = useState({});
  const [activeDictId, setActiveDictId] = useState("");
  const dictionaryRefs = useRef({});

  const handleClickDict = useCallback((dictId) => {
    window.scrollTo({
      top: dictionaryRefs.current[dictId].offsetTop,
    });
  }, []);

  const activateNav = useCallback(() => {
    const activeDictId = dictionaryIds
      .filter(
        (dictId) =>
          contents[dictId] &&
          window.scrollY + 136 >= dictionaryRefs.current[dictId].offsetTop
      )
      .sort(
        (a, b) =>
          dictionaryRefs.current[b].offsetTop -
          dictionaryRefs.current[a].offsetTop
      )[0];
    setActiveDictId(activeDictId);
  }, [dictionaryIds, contents]);

  useEffect(() => {
    window.addEventListener("scroll", activateNav);
    activateNav();
    return () => {
      window.removeEventListener("scroll", activateNav);
    };
  }, [activateNav]);

  useEffect(() => {
    onQuery();
    setContents({});
    dictionaryIds.forEach((dictId) => {
      dictionaries[dictId](query).then((node) => {
        if (!node) {
          setContents((prev) => ({
            ...prev,
            [dictId]: false,
          }));
          return;
        }
        if (node instanceof Node) {
          const container = document.createElement("div");
          container.appendChild(node);
          setContents((prev) => ({
            ...prev,
            [dictId]: (
              <div
                dangerouslySetInnerHTML={{ __html: container.innerHTML }}
              ></div>
            ),
          }));
        } else if (React.isValidElement(node)) {
          setContents((prev) => ({
            ...prev,
            [dictId]: node,
          }));
        }
      });
    });
  }, [query]);

  return (
    <Fragment>
      <div className="sticky-top">
        <nav className="navbar navbar-light bg-light">
          <ul className="nav nav-pills flex-grow-1">
            {dictionaryIds
              .filter((dictId) => contents[dictId])
              .map((dictId) => (
                <li className="nav-item" key={dictId}>
                  <a
                    className={
                      activeDictId === dictId ? "nav-link active" : "nav-link"
                    }
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handleClickDict(dictId);
                    }}
                  >
                    {dictId}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className="container">
        {dictionaryIds.every((dictId) => contents[dictId] === false) ? (
          <h1 className="display-1 text-center mt-5">找不到資料 (×_×)⌒☆</h1>
        ) : (
          dictionaryIds
            .filter((dictId) => contents[dictId])
            .map((dictId) => (
              <Dictionary
                ref={(element) => (dictionaryRefs.current[dictId] = element)}
                title={dictionaries[dictId].name}
                key={dictId}
              >
                {contents[dictId]}
              </Dictionary>
            ))
        )}
      </div>
    </Fragment>
  );
};

Query.propTypes = {
  query: PropTypes.string.isRequired,
  dictionaryIds: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(dictionaries)))
    .isRequired,
  onQuery: PropTypes.func,
};

Query.defaultProps = {
  onQuery: () => {},
};

export default Query;
