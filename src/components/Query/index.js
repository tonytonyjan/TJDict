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

const Query = ({ query, dictionaryIds }) => {
  const [activeDictId, setActiveDictId] = useState("");
  const [found, setFound] = useState({});
  const dictionaryRefs = useRef({});
  const handleFound = useCallback(
    (dictId) => {
      setFound((prev) => ({ ...prev, [dictId]: true }));
    },
    [found]
  );
  const handleClickDict = useCallback((dictId) => {
    window.scrollTo({
      top: dictionaryRefs.current[dictId].offsetTop,
    });
  }, []);
  const activateNav = useCallback(() => {
    const activeDictId = dictionaryIds
      .filter(
        (dictId) =>
          found[dictId] &&
          window.scrollY + 136 >= dictionaryRefs.current[dictId].offsetTop
      )
      .sort(
        (a, b) =>
          dictionaryRefs.current[b].offsetTop -
          dictionaryRefs.current[a].offsetTop
      )[0];
    setActiveDictId(activeDictId);
  }, [dictionaryIds, found]);
  useEffect(() => {
    setFound({});
  }, [query]);
  useEffect(() => {
    window.addEventListener("scroll", activateNav);
    activateNav();
    return () => {
      window.removeEventListener("scroll", activateNav);
    };
  }, [activateNav]);
  return (
    <Fragment>
      <div className="sticky-top">
        <nav className="navbar navbar-light bg-light">
          <ul className="nav nav-pills flex-grow-1">
            {dictionaryIds
              .filter((dictId) => found[dictId])
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
        {dictionaryIds.map((dictId) => (
          <Dictionary
            ref={(element) => (dictionaryRefs.current[dictId] = element)}
            query={query}
            dict={dictionaries[dictId]}
            onFound={handleFound}
            key={dictId}
          />
        ))}
      </div>
    </Fragment>
  );
};

Query.propTypes = {
  query: PropTypes.string.isRequired,
  dictionaryIds: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(dictionaries)))
    .isRequired,
};

export default Query;
