import React, {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";
import Dictionary from "components/Dictionary";

const Query = ({ dictionaries }) => {
  const [activeDictId, setActiveDictId] = useState("");
  const dictionaryRefs = useRef({});

  const handleClickDict = useCallback((dictId) => {
    window.scrollTo({
      top: dictionaryRefs.current[dictId].offsetTop,
    });
  }, []);

  const activateNav = useCallback(() => {
    const activeDict = dictionaries
      .filter(
        ({ id }) => window.scrollY + 140 >= dictionaryRefs.current[id].offsetTop
      )
      .sort(
        ({ id: a }, { id: b }) =>
          dictionaryRefs.current[b].offsetTop -
          dictionaryRefs.current[a].offsetTop
      )[0];
    if (activeDict) setActiveDictId(activeDict.id);
  }, [dictionaries]);

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
            {dictionaries.map(({ id, title }) => (
              <li className="nav-item" key={id}>
                <a
                  className={
                    activeDictId === id ? "nav-link active" : "nav-link"
                  }
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    handleClickDict(id);
                  }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container">
        {dictionaries.map(({ id, title, content }) => (
          <Dictionary
            ref={(element) => (dictionaryRefs.current[id] = element)}
            title={title}
            key={title}
          >
            {content}
          </Dictionary>
        ))}
      </div>
    </Fragment>
  );
};

Query.propTypes = {
  dictionaries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    }).isRequired
  ).isRequired,
};

Query.defaultProps = {
  dictionaries: [],
  onQuery: () => {},
};

export default Query;
