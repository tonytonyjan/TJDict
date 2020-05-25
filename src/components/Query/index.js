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
  const foundStates = dictionaryIds.reduce((acc, dictId) => {
    const [state, setState] = useState(false);
    acc[dictId] = {
      state,
      setState,
    };
    return acc;
  }, {});
  const dictionaryRefs = dictionaryIds.reduce(
    (acc, dictId) => ((acc[dictId] = useRef(null)), acc),
    {}
  );
  const handleFound = useCallback((dictId) => {
    foundStates[dictId].setState(true);
  }, []);
  const handleClickDict = useCallback((dictId) => {
    window.scrollTo({
      top: dictionaryRefs[dictId].current.offsetTop,
    });
  }, []);
  const activateNav = useCallback(() => {
    const activeDictId = dictionaryIds
      .filter(
        (dictId) =>
          foundStates[dictId].state &&
          window.scrollY + 136 >= dictionaryRefs[dictId].current.offsetTop
      )
      .sort(
        (a, b) =>
          dictionaryRefs[b].current.offsetTop -
          dictionaryRefs[a].current.offsetTop
      )[0];
    setActiveDictId(activeDictId);
  }, [...Object.values(foundStates)]);
  useEffect(() => {
    Object.values(foundStates).forEach((foundState) =>
      foundState.setState(false)
    );
  }, [query, dictionaryIds]);
  useEffect(() => {
    window.addEventListener("scroll", activateNav);
    activateNav();
    return () => {
      window.removeEventListener("scroll", activateNav);
    };
  }, [...Object.values(foundStates)]);
  return (
    <Fragment>
      <div className="sticky-top">
        <nav className="navbar navbar-light bg-light">
          <ul className="nav nav-pills flex-grow-1">
            {dictionaryIds
              .filter((dictId) => foundStates[dictId].state)
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
            rootRef={dictionaryRefs[dictId]}
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
  dictionaryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Query.defaultProps = {
  dictionaryIds: ["yahoo", "weblio", "voicetube", "urban", "oxford", "jukuu"],
};

export default Query;
