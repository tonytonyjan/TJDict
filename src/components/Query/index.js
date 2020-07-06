import React, {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";
import Dictionary from "components/Dictionary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Query = ({ dictionaries, broadcast }) => {
  const [activeDictId, setActiveDictId] = useState("");
  const dictionaryRefs = useRef({});
  const dictsContainer = useRef(null);

  const handleClickDict = useCallback((dictId) => {
    window.scrollTo({
      top: dictionaryRefs.current[dictId].offsetTop,
    });
  }, []);

  const activateNav = useCallback(() => {
    const activeDict = dictionaries
      .filter(
        ({ id }) =>
          window.scrollY + dictsContainer.current.offsetTop >=
          dictionaryRefs.current[id].offsetTop
      )
      .sort(
        ({ id: a }, { id: b }) =>
          dictionaryRefs.current[b].offsetTop -
          dictionaryRefs.current[a].offsetTop
      )[0];
    if (activeDict) setActiveDictId(activeDict.id);
  }, [dictionaries, dictsContainer]);

  useEffect(() => {
    window.addEventListener("scroll", activateNav);
    activateNav();
    return () => {
      window.removeEventListener("scroll", activateNav);
    };
  }, [activateNav]);

  return (
    <Fragment>
      {broadcast && (
        <div className="d-flex align-items-center ml-3 pl-3 my-1 text-secondary">
          <FontAwesomeIcon fixedWidth icon={faVolumeUp} size="lg" />
          <span className="ml-3">{broadcast}</span>
        </div>
      )}
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
      <div ref={dictsContainer} className="container-fluid">
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
  broadcast: PropTypes.node,
};

Query.defaultProps = {
  dictionaries: [],
};

export default Query;
