import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import dictionaries from "dictionaries";
import "./style.css";

const Dictionaries = ({
  dictionaryIds,
  unusedDictionaryIds,
  onAddDictionary,
  onRemoveDictionary,
  onMoveUpDictionary,
}) => {
  const handleClickDictionary = useCallback(
    ({
      currentTarget: {
        dataset: { dictId },
      },
    }) => onAddDictionary(dictId),
    []
  );
  const handleClickArrowUp = useCallback(
    ({
      currentTarget: {
        dataset: { dictId },
      },
    }) => onMoveUpDictionary(dictId),
    []
  );
  const handleClickTrash = useCallback(
    ({
      currentTarget: {
        dataset: { dictId },
      },
    }) => onRemoveDictionary(dictId),
    []
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <h6>啟用中的字典</h6>
          <ul className="list-group">
            {dictionaryIds.map((dictId, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={dictId}
              >
                <span className="flex-grow-1">
                  {dictionaries[dictId].displayName}
                </span>
                {index !== 0 && (
                  <FontAwesomeIcon
                    size="lg"
                    fixedWidth
                    className="text-secondary dictionaries__action"
                    icon={faArrowUp}
                    data-dict-id={dictId}
                    onClick={handleClickArrowUp}
                  />
                )}
                <FontAwesomeIcon
                  size="lg"
                  className="ml-4 text-secondary dictionaries__action"
                  fixedWidth
                  icon={faTrash}
                  data-dict-id={dictId}
                  onClick={handleClickTrash}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-6">
          <h6>未啟用的字典</h6>
          <ul className="list-group">
            {unusedDictionaryIds.map((dictId) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={dictId}
              >
                <span className="flex-grow-1">
                  {dictionaries[dictId].displayName}
                </span>
                <FontAwesomeIcon
                  size="lg"
                  className="ml-4 text-secondary dictionaries__action"
                  fixedWidth
                  icon={faPlus}
                  data-dict-id={dictId}
                  onClick={handleClickDictionary}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Dictionaries.propTypes = {
  dictionaryIds: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(dictionaries)))
    .isRequired,
  unusedDictionaryIds: PropTypes.arrayOf(
    PropTypes.oneOf(Object.keys(dictionaries))
  ).isRequired,
  onAddDictionary: PropTypes.func,
  onMoveUpDictionary: PropTypes.func,
  onRemoveDictionary: PropTypes.func,
};

Dictionaries.defaultProps = {
  dictionaryIds: [],
  unusedDictionaryIds: [],
  onAddDictionary: () => {},
  onMoveUpDictionary: () => {},
  onRemoveDictionary: () => {},
};

export default Dictionaries;
